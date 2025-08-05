import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Request, Response } from "express";
import {
  deleteFavRecpiesService,
  favARecpies,
  getAllFavRecepie,
} from "../services/favourite.service.js";

export const favRecepies = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { user } = req;
    if (!user) throw new ApiError(400, "UnAuthorized User");

    const { recepieId } = req.params;
    const userRecepies = await favARecpies(user._id, recepieId);

    return res
      .status(201)
      .json(
        new ApiResponse(200, { userRecepies }, "Recipe Saved in Favourite successfully"),
      );
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const deleteFavRecepie = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { user } = req;
      if (!user) throw new ApiError(400, "UnAuthorized User");

      const { recepieId } = req.params;
      const userRecepies = await deleteFavRecpiesService(user._id, recepieId);

      return res
        .status(201)
        .json(
          new ApiResponse(200, { userRecepies }, "Recipe unFavourited successfully"),
        );
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something went wrong");
    }
  },
);

export const getFavRecepie = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { user } = req;
      if (!user) throw new ApiError(400, "UnAuthorized User");

      const userRecepies = await getAllFavRecepie(user._id);

      return res
        .status(201)
        .json(
          new ApiResponse(200, { userRecepies }, "Favourite Recepies"),
        );
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something went wrong");
    }
  },
);
