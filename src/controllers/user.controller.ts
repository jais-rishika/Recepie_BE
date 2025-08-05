import { Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  unblockUserService,
  blockUserService,
  updateUserProfile,
  updateUserDetails,
} from "../services/user.service.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const getCurrUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { user } = req;
    if (!user) throw new ApiError(400, "UnAuthorized User");

    return res
      .status(200)
      .json(new ApiResponse(201, { user }, "User Fetched Successfully"));
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something Went Wrong");
  }
});

export const blockUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { user } = req;
    if (!user) throw new ApiError(400, "UnAuthorized User");

    const { secondUserId } = req.body;
    if (!secondUserId) throw new ApiError(400, "ID to block does not exist");

    const doc = await blockUserService(user._id, secondUserId);
    return res.status(201).json(new ApiResponse(201, { doc }, "Blocked User"));
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something Went Wrong");
  }
});

export const unblockUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { user } = req;
    if (!user) throw new ApiError(400, "UnAuthorized User");

    const { secondUserId } = req.body;
    if (!secondUserId) throw new ApiError(400, "ID to unblock does not exist");

    const doc = await unblockUserService(user._id, secondUserId);

    return res
      .status(201)
      .json(new ApiResponse(201, { doc }, "Unblocked User"));
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something Went Wrong");
  }
});

export const getBlockedUsers = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { user } = req;
      if (!user) throw new ApiError(400, "UnAuthorized User");

      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            { blockedUsers: user.blockedUsers },
            "All Users Blocked by Current User",
          ),
        );
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something Went Wrong");
    }
  },
);

export const getUserByUsername = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username: username });

      if (!user) throw new ApiError(401, "User Not Found with given Username");

      return res
        .status(200)
        .json(new ApiResponse(201, { user }, "User Fetched Successfully"));
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something Went Wrong");
    }
  },
);

export const getUserByuserId = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ _id: userId });

      if (!user) throw new ApiError(401, "User Not Found with given userId");

      return res
        .status(200)
        .json(new ApiResponse(201, { user }, "User Fetched Successfully"));
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something Went Wrong");
    }
  },
);

export const updateCurrUser = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { user } = req;
      if (!user) throw new ApiError(400, "UnAuthorized User");
      await updateUserDetails(user, req.body);
      return res
        .status(200)
        .json(new ApiResponse(201, { user }, "User Updated Successfully"));
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something Went Wrong");
    }
  },
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { user } = req;
      if (!user) throw new ApiError(400, "UnAuthorized User");

      const profileImg = req.file?.path;
      if (!profileImg) throw new ApiError(400, "Profile not found");

      await updateUserProfile(user, profileImg);
      return res
        .status(200)
        .json(new ApiResponse(201, {}, "Profile upload Successfull"));
    } catch (error: any) {
      throw new ApiError(101, error.message || "Something Went Wrong");
    }
  },
);
