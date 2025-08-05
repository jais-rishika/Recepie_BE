import { Types } from "mongoose";
import { Follow } from "../models/follow.model.js";
import ApiError from "../utils/ApiError.js";

export const getCurrUserFollowers = async (userId: Types.ObjectId) => {
  try {
    const followers = await Follow.find({ following: userId }).select(
      "+follower",
    );
    return followers;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something Went Wrong");
  }
};

export const getCurrUserFollowings = async (userId: Types.ObjectId) => {
  try {
    const following = await Follow.find({ follower: userId }).select(
      "+following",
    );
    return following;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something Went Wrong");
  }
};

export const getFollowersFollowing = async (userId: Types.ObjectId) => {
  try {
    const [followCount, followingCount] = await Promise.all([
      Follow.countDocuments({ following: userId }),
      Follow.countDocuments({ follower: userId }),
    ]);
    return { followCount, followingCount };
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something Went Wrong");
  }
};

// follow , unfollow and block users

export const followUserService = async (
  userId: Types.ObjectId,
  toFollowId: Types.ObjectId,
) => {
  try {
    const checkExisting = await Follow.findOne({
      follower: userId,
      following: toFollowId,
    });
    if (checkExisting) throw new ApiError(400, "Already Followed");

    const followers = await Follow.create({
      follower: userId,
      following: toFollowId,
    });

    return followers;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something Went Wrong");
  }
};

export const unfollowUserService = async (
  userId: Types.ObjectId,
  toFollowId: Types.ObjectId,
) => {
  try {
    await Follow.findOneAndDelete({ follower: userId, following: toFollowId });
    const checkExisting = await Follow.findOne({
      follower: userId,
      following: toFollowId,
    });
    if (checkExisting)
      throw new ApiError(500, "Sorry Could ot unfollow for some reason");
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something Went Wrong");
  }
};
