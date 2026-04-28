import { ApiRespose } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
/**
 * Old syntax/code
const healthcheck = (req, res) => {
  try {
    res
      .status(200)
      .json(new ApiRespose(200, { messsage: "Server is running" }));
  } catch (error) {
    res.json("Error from healthcheck", error);
  }
};
 */

//new Method using catch as utility
const healthcheck = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiRespose(200, { message: "Server is running" }));
});

export { healthcheck };
