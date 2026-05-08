import { User } from "../models/User.model.js";
import { ApiRespose } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    //ignore all fields validation before saving
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //check if user exists
  const existingUser = User.findOne({
    $or: [{ username }, { email }],
  });

  //check if user exists in the DB
  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists", []);
  }

  //if user doesn't exists
  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
  });

  //generate temporary token
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  //Send mail
  await sendEmail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`,
    ),
  });

  //fields not to send
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wront while registering a user");
  }

  return res
    .status(201)
    .json(
      new ApiRespose(
        200,
        { user: createdUser },
        "User registered successfully, Verification link has been sent",
      ),
    );
});

export { registerUser };
