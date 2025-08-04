import { Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getCurrUserFollowers, getCurrUserFollowings, getFollowersFollowing , unblockUserService, blockUserService, unfollowUserService, followUserService} from "../services/user.service.js";

export const getCurrUser = asyncHandler(async(req: Request, res: Response)=>{
    try {
        const {user}= req;
        if(!user) throw new ApiError(400, "UnAuthorized User");
    
        return res.
            status(200).
            json(new ApiResponse(201, {user}, "User Fetched Successfully"))

    } catch (error: any) {
        throw new ApiError(500, error.message || "Something Went Wrong");
    }
})

export const getFollowers = asyncHandler(async(req: Request, res: Response)=>{
    try {
        const {user}= req;
        if(!user) throw new ApiError(400, "UnAuthorized User");
    
        const followers=getCurrUserFollowers(user._id);
        return res.status(201).json(new ApiResponse(201,{followers},"All Current User Followers"));

    } catch (error: any) {
        throw new ApiError(500, error.message || "Something Went Wrong");
    }
})

export const getFollowing= asyncHandler(async(req: Request, res: Response)=>{
    try {
        const {user}= req;
        if(!user) throw new ApiError(400, "UnAuthorized User");
    
        const following=await getCurrUserFollowings(user._id);
        return res
        .status(201)
        .json(new ApiResponse(201,{following},"All Current User is Following"));

    } catch (error: any) {
        throw new ApiError(500, error.message || "Something Went Wrong");
    }
})

export const getBlockedUsers= asyncHandler(async(req: Request, res: Response)=>{
    try {
        const {user}= req;
        if(!user) throw new ApiError(400, "UnAuthorized User");
    
        return res
        .status(201)
        .json(new ApiResponse(201,{blockedUsers: user.blockedUsers},"All Users Blocked by Current User"));

    } catch (error: any) {
        throw new ApiError(500, error.message || "Something Went Wrong");
    }
})

export const getFollowerFollowingSize=asyncHandler(async(req: Request, res: Response)=>{
    try {
        const {user}= req;
        if(!user) throw new ApiError(400, "UnAuthorized User");
    
        const {followCount,followingCount}=await getFollowersFollowing(user._id);
        return res
        .status(201)
        .json(new ApiResponse(201,{following: followingCount,followers: followCount},"All Current User is Following"));

    } catch (error: any) {
        throw new ApiError(500, error.message || "Something Went Wrong");
    }
})

export const followUser=asyncHandler(async(req: Request, res: Response)=>{
    try {
        const {user}= req;
        if(!user) throw new ApiError(400, "UnAuthorized User");

        const {secondUserId}=req.body;
        if(!secondUserId) throw new ApiError(400, "ID to follow does not exist");
    
        const doc=await followUserService(user._id,secondUserId);
        return res
        .status(201)
        .json(new ApiResponse(201,{doc},"Followed User"));

    } catch (error: any) {
        throw new ApiError(500, error.message || "Something Went Wrong");
    }
})

export const unfollowUser=asyncHandler(async(req: Request, res: Response)=>{
    try {
        const {user}= req;
        if(!user) throw new ApiError(400, "UnAuthorized User");

        const {secondUserId}=req.body
        if(!secondUserId) throw new ApiError(400, "ID to unfollow does not exist");
    
        const doc=await unfollowUserService(user._id,secondUserId);
        return res
        .status(201)
        .json(new ApiResponse(201,{doc},"Unfollowed User"));

    } catch (error: any) {
        throw new ApiError(500, error.message || "Something Went Wrong");
    }
})

export const blockUser=asyncHandler(async(req: Request, res: Response)=>{
    try {
        const {user}= req;
        if(!user) throw new ApiError(400, "UnAuthorized User");

        const {secondUserId}=req.body
        if(!secondUserId) throw new ApiError(400, "ID to block does not exist");
    
        const doc=await blockUserService(user._id,secondUserId);
        return res
        .status(201)
        .json(new ApiResponse(201,{doc},"Blocked User"));

    } catch (error: any) {
        throw new ApiError(500, error.message || "Something Went Wrong");
    }
})

export const unblockUser=asyncHandler(async(req: Request, res: Response)=>{
    try {
        const {user}= req;
        if(!user) throw new ApiError(400, "UnAuthorized User");
        
        const {secondUserId}=req.body
        if(!secondUserId) throw new ApiError(400, "ID to unblock does not exist");
    
        const doc=await unblockUserService(user._id,secondUserId);

        return res
        .status(201)
        .json(new ApiResponse(201,{doc},"Unblocked User"));

    } catch (error: any) {
        throw new ApiError(500, error.message || "Something Went Wrong");
    }
})