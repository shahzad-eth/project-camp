import mongoose from "mongoose";
import bcrytp from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    avatar: {
      type: {
        url: String,
        localpath: String,
      },
      default: {
        url: `https://placehold.co/200x200`,
        localpath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationExpiry: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Password Hashing
UserSchema.pre("save", async function (next) {
  //only run if password is modified
  if (!this.isModified("password")) return next();

  this.password = await bcrytp.hash(this.password, 10);
  next();
});

export const User = mongoose.model("User", UserSchema);
