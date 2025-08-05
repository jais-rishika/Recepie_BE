import { commentRecepieService, getComments } from "../services/comment.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Request, Response } from "express";

export const commentOnRecepie = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { user } = req;
      if (!user) throw new ApiError(400, "UnAuthorized User");
      const { recepieId } = req.params;
      const {comment}= req.body
      const recepies = await commentRecepieService(user._id, recepieId,comment);

      return res
        .status(201)
        .json(new ApiResponse(200, { recepies }, "Comment On Recipe"));
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something went wrong");
    }
  },
);

export const commentsOfRecepie = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { recepieId } = req.params;
      const comments = await getComments(recepieId);

      return res
        .status(201)
        .json(new ApiResponse(200, { comments }, "Comment On Recipe"));
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something went wrong");
    }
  },
);
