import { Types } from "mongoose";
import { Comments } from "../models/comment.model.js";
import ApiError from "../utils/ApiError.js";
import { Recipe } from "../models/recepie.model.js";

export const commentRecepieService = async (
  userId: Types.ObjectId,
  recepieId: string,
  comment: string
) => {
  try {
    const recepie=await Recipe.findById(recepieId).select("+owner");
    if(!recepie) throw new ApiError(400,"So such Recepie Exist")
    const userRecepies = await Comments.create({
      user: userId,
      recepie: new Types.ObjectId(recepieId),
      comment: comment,
      isPinned: userId?.equals(recepie.owner)
    });

    return userRecepies;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went Wrong");
  }
};

export const getComments= async (
  recepieId: string,
) => {
  try {
    const comments = await Comments.find({recepie: new Types.ObjectId(recepieId),});
    if(!comments) throw new ApiError(400,"Comment Failed")
    return comments;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went Wrong");
  }
};