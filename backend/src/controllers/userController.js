import { User } from "../models/userModel.js";
import {ApiError} from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, username } = req.body;
  console.log("body", req.body);
  if ([name, email, password, username].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All filds are required !");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, ERROR_MESSAGES.USER_EXISTS);
  }

  const user = await User.create({
    name,
    email,
    username,
    password,
    role: "Admin",
  });

  const cretedUser = await User.findById(user._id).select("-password");
  if (!cretedUser) {
    throw new ApiError(500, ERROR_MESSAGES.SERVER_ERROR);
  }
  const option = {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  const token = user.generateAuthToken();
  console.log("token", token);
  //send response to client
  res
    .status(201)
    .cookie("token", token, option)
    .json(
      new ApiResponse(
        200,
        {
          user: cretedUser,
          token,
        },
        "User Registered Succesfully!"
      )
    );
});

export { registerUser };
