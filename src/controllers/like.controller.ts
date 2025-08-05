import {
  likeRecepieService,
  unlikeRecepieService,
} from "../services/like.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";

export const likeRecepie = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { user } = req;
    if (!user) throw new ApiError(400, "UnAuthorized User");

    const { recepieId } = req.params;
    const userRecepies = await likeRecepieService(user._id, recepieId);

    return res
      .status(201)
      .json(new ApiResponse(200, { userRecepies }, "Recipe Liked"));
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const unlikeRecepie = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { user } = req;
      if (!user) throw new ApiError(400, "UnAuthorized User");

      const { recepieId } = req.params;
      await unlikeRecepieService(user._id, recepieId);

      return res
        .status(201)
        .json(new ApiResponse(200, {}, "Recipe Unliked"));
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something went wrong");
    }
  },
);
