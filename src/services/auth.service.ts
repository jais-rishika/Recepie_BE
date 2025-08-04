import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { GetUserDTO, UserResponseDTO } from "../DTOs/user.dto.js";
import ApiError from "../utils/ApiError.js";
import { LoginUserDTO, RegisterUserDTO } from "../DTOs/auth.dto.js";
import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async (
  userId: mongoose.Types.ObjectId,
) => {
  try {
    const user: GetUserDTO | null = await User.findById(userId);
    if (!user) throw new ApiError(400, "No such user exist");

    const accessToken: string =await  user.generateAccessToken();
    const refreshToken: string =await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token",
    );
  }
};

export const registerUser = async (
  data: RegisterUserDTO,
): Promise<UserResponseDTO> => {
  const { username, email, password, fullName } = data;

  if (
    [username, email, password, fullName].some((field) => field?.trim() === "")
  )
    throw new ApiError(400, "All Fields are required");

  const existingUsername = await User.findOne({ username });
  if (existingUsername)
    throw new ApiError(409, "User with same username already exists");

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists with given email");
  }

  const newUser = await User.create({
    username,
    email,
    password,
    fullName,
  });
  const createdUser = await User.findById(newUser._id).select(
    " -password -refreshToken",
  );

  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");

  return createdUser;
};

export const loginUser = async (
  data: LoginUserDTO,
): Promise<{
  user: UserResponseDTO;
  accessToken: string;
  refreshToken: string;
}> => {
  //check if email or username exist in DB
  //check for password
  //send access and refresh token
  const { userId, password } = data;

  if (!userId && !password) throw new ApiError(400, "Both fields required");

  const curr_user: GetUserDTO | null = await User.findOne({
    $or: [{ email: userId }, { username: userId }],
  });

  if (!curr_user)
    throw new ApiError(
      400,
      "User does not exist with provided email or username",
    );

  const isPasswordCorrect: boolean = curr_user.isPasswordCorrect(password);

  if (!isPasswordCorrect)
    throw new ApiError(400, "Password does not match the user");
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    curr_user._id,
  );
  
  const userObj = curr_user.toObject();
  delete userObj.password;

  return { user: userObj, accessToken, refreshToken };
};
