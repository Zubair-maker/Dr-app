import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
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
    throw new ApiError(409, "user is already exist");
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
    throw new ApiError(403, "user is not found");
  }
  const option = {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  const token = user.generateAuthToken();
  console.log("token", token);
  //send response to client
  res.status(201).json(
    new ApiResponse(
      200,

      cretedUser,

      "User Registered Succesfully!"
    )
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "username and password is required");
  }
  const user = await User.findOne({ username })
  if (!user) {
    throw new ApiError(401, "username not found");
  }
  const passswordIsMatch = await user.isPasswordCorrect(password);
  if (!passswordIsMatch) {
    throw new ApiError(401, "Invalid username and password!!");
  }
  const token = user.generateAuthToken();

  res.status(201).json(new ApiResponse(200, {token}, "User login Succesfully!"));
});

export { registerUser, loginUser};
