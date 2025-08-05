import { Types } from "mongoose";
import ApiError from "../utils/ApiError.js";
import { Favourites } from "../models/favourite.model.js";

export const favARecpies = async (
  userId: Types.ObjectId,
  recepieId: string,
) => {
  try {
    const userRecepies = await Favourites.create({
      user: userId,
      recepie: recepieId,
    });
    if (!userRecepies)
      throw new ApiError(500, "Sorry Could Not favourite the Recepie");
    return userRecepies;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went Wrong");
  }
};

export const deleteFavRecpiesService = async (
  userId: Types.ObjectId,
  recepieId: string,
) => {
  try {

     const getFav=await Favourites.findOneAndUpdate(
      { user: userId ,
        recepie: { $in: [new Types.ObjectId(recepieId)] }
      })
      console.log(getFav)
     const result = await Favourites.findOneAndUpdate(
      { user: userId ,
        recepie: { $in: [new Types.ObjectId(recepieId)] }
      },
      { $pull: { recepie: new Types.ObjectId(recepieId) } },
      { new: true }
    );
    if (!result) {
      throw new ApiError(404, "Favourite folder not found");
    }

    // Check if the recepie is still there (should not be)
    if (result.recepie.includes(new Types.ObjectId(recepieId))) {
      throw new ApiError(500, "Sorry Could Not Unfavourite");
    }
    return;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went Wrong");
  }
};

export const getAllFavRecepie = async (userId: Types.ObjectId) => {
  try {
    const userFavRecepies = await Favourites.find({ user: userId })
      .populate("recepie", "title image owner")
      .populate("user", "profile username");
    if (!userFavRecepies)
      throw new ApiError(500, "Problem in fetching favourite Recepies");
    return userFavRecepies;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went Wrong");
  }
};
