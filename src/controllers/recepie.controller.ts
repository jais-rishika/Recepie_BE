import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import {
  createRecepieService,
  deleteRecepieService,
  getAllRecepieService,
  getSingleRecepieService,
  getUserRecpies,
  updateRecepieService,
} from "../services/recepie.service.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createRecepie = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { user } = req;
      if (!user) throw new ApiError(400, "UnAuthorized User");

      const data = { ...req.body, image: req.file?.path };

      const newRecipe = await createRecepieService(data, user._id);

      return res
        .status(201)
        .json(
          new ApiResponse(201, { newRecipe }, "Recipe created successfully"),
        );
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something went wrong");
    }
  },
);

export const updateRecepie = asyncHandler(
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const { user } = req;
      if (!user) throw new ApiError(400, "UnAuthorized User");

      const { recepieId } = req.params;
      console.log(req.body)
      const data = { ...req.body, image: req.file?.path };
      const updatedRecipe = await updateRecepieService(
        recepieId,
        user._id,
        data,
      );

      return res
        .status(201)
        .json(
          new ApiResponse(
            200,
            { updatedRecipe },
            "Recipe updated successfully",
          ),
        );
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something went wrong");
    }
  }),
);

export const deleteRecepie = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { user } = req;
      if (!user) throw new ApiError(400, "UnAuthorized User");

      const { recepieId } = req.params;
      const deleteRecipe = await deleteRecepieService(recepieId);

      return res
        .status(201)
        .json(
          new ApiResponse(200, { deleteRecipe }, "Recipe deleted successfully"),
        );
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something went wrong");
    }
  },
);

export const getAllRecepies = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { page, offset } = req.params;
      const allRecepies = await getAllRecepieService(+offset, +page);

      return res
        .status(201)
        .json(
          new ApiResponse(200, { allRecepies }, "Recipes fetched successfully"),
        );
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something went wrong");
    }
  },
);

export const getSingleRecepie = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { recepieId } = req.params;
      const recepie = await getSingleRecepieService(recepieId);
      return res
        .status(201)
        .json(new ApiResponse(200, { recepie }, "Recipe fetched successfully"));
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something went wrong");
    }
  },
);

export const userRecepies = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { user } = req;
      if (!user) throw new ApiError(400, "UnAuthorized User");

      const userRecepies = await getUserRecpies(user._id);

      return res
        .status(201)
        .json(
          new ApiResponse(200, { userRecepies }, "Recipe deleted successfully"),
        );
    } catch (error: any) {
      throw new ApiError(500, error.message || "Something went wrong");
    }
  },
);