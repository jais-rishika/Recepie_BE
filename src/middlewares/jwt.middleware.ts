import { NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JwtPayloadWithId } from "../types/auth.types";
import { PublicUser } from "../types/user.types";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new ApiError(401, "Unauthorized Request");

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as JwtPayloadWithId;

    const user: PublicUser|null = await User.findById(decodedToken._id).select(
      "-password -refreshToken",
    );
    if (!user) throw new ApiError(401, "Invalid Access Token");

    req.user = user as PublicUser;
    next();
    
  } catch (err: any) {
    throw new ApiError(401, err?.message || "Invalid access Token");
  }
});
