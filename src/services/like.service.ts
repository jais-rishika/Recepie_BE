import { Types } from "mongoose";
import { Likes } from "../models/like.model.js";
import ApiError from "../utils/ApiError.js";

export const likeRecepieService = async (
  userId: Types.ObjectId,
  recepieId: string,
) => {
  try {
    const userRecepies = await Likes.create({
      user: userId,
      recepie: new Types.ObjectId(recepieId),
    });
    if(!userRecepies) throw new ApiError(500,"Like Failed")
    return userRecepies;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went Wrong");
  }
};

export const unlikeRecepieService = async (
  userId: Types.ObjectId,
  recepieId: string,
) => {
  try {
    const userRecepies = await Likes.findOneAndDelete({
      user: userId,
      recepie: new Types.ObjectId(recepieId),
    });
    const check =await Likes.findOne({
      user: userId,
      recepie: new Types.ObjectId(recepieId),
    });
    if(check) throw new ApiError(500,"Unlike Failed")
    return;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went Wrong");
  }
};
