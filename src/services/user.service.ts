import { Path, Types } from "mongoose";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { GetUserDTO } from "../DTOs/user.dto.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ExtraUserDetails, PublicUser } from "../types/user.types.js";
import path from "path";

export const blockUserService = async (
  userId: Types.ObjectId,
  toUnfollowId: Types.ObjectId,
) => {
  try {
    const currUser = await User.findById(userId);
    if (!currUser) throw new ApiError(500, "Cannot find The User");

    currUser?.blockedUsers.push(toUnfollowId);
    await currUser.save();
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something Went Wrong");
  }
};

export const unblockUserService = async (
  userId: Types.ObjectId,
  toUnfollowId: Types.ObjectId,
) => {
  try {
    const currUser = await User.findById(userId);
    if (!currUser) throw new ApiError(500, "Cannot find The User");

    currUser.blockedUsers = currUser?.blockedUsers.filter(
      (id) => !id.equals(toUnfollowId),
    );
    await currUser.save();
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something Went Wrong");
  }
};

export const updateUserProfile = async (user: PublicUser, profileImg: Path) => {
  try {
    const uploadImage = await uploadOnCloudinary(profileImg);

    if (!uploadImage) throw new ApiError(500, "Profile Upload failed");

    user.profile = uploadImage.secure_url;
    await user.save();
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something Went Wrong");
  }
};

export const updateUserDetails = async (
  user: PublicUser,
  data: ExtraUserDetails,
) => {
  try {
    if (!user.extraDetails) user.extraDetails = {};

    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "string" && !value.trim()) return;
      switch (key) {
        case "fullname":
          user.fullName = String(value).trim();
          break;
        case "allergicTo":
          if (Array.isArray(data.allergicTo))
            user.extraDetails!.allergicTo = data.allergicTo;
          break;
        default:
          (user.extraDetails as any)[key] =
            typeof value === "string" ? value.trim() : value;
          break;
      }
    });

    await user.save();
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something Went Wrong");
  }
};
