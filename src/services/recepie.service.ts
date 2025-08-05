import { Types } from "mongoose";
import ApiError from "../utils/ApiError.js";
import { CreateRecipeInput } from "../types/recepie.types.js";
import { Recipe } from "../models/recepie.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { Comments } from "../models/comment.model.js";

export const createRecepieService = async (
  data: CreateRecipeInput,
  userId: Types.ObjectId,
) => {
  try {
    let imageUrl = "";

    if (data.image) {
      const uploaded = await uploadOnCloudinary(data.image);
      if (!uploaded || !uploaded.secure_url) {
        throw new ApiError(500, "Image upload failed");
      }
      imageUrl = uploaded.secure_url;
    }

    const recipe = await Recipe.create({
      title: data.title,
      image: imageUrl,
      servings: data.servings,
      readyInMinutes: data.readyInMinutes,
      cookingMinutes: data.cookingMinutes,
      preparationMinutes: data.preparationMinutes,
      instructions: data.instructions,
      summary: data.summary,
      draft: data.draft,
      ingredients: data.ingredients,
      commentsDisabled: false,
      owner: userId,
      source: data.source || "user",
      spoonacularId: data.spoonacularId,
      sourceUrl: data.sourceUrl,
      spoonacularSourceUrl: data.spoonacularSourceUrl,
      dishTypes: data.dishTypes,
      cuisines: data.cuisines,
      diets: data.diets,
      healthScore: data.healthScore,
      pricePerServing: data.pricePerServing,
      veryHealthy: data.veryHealthy,
      vegan: data.vegan,
      vegetarian: data.vegetarian,
    });

    return recipe;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something Went Wrong");
  }
};

export const deleteRecepieService = async (recepieId: string) => {
  try {
    await Recipe.findByIdAndDelete(recepieId);
    const check = await Recipe.findById(recepieId);
    if (check) throw new ApiError(500, "Sorry Recepie could not be deleted");
    await Comments.deleteMany({ recepie:  new Types.ObjectId(recepieId)});
    return;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went Wrong");
  }
};

export const updateRecepieService = async (
  recepieId: string,
  userId: Types.ObjectId,
  data: CreateRecipeInput,
) => {
  try {
    const recipe = await Recipe.findById(recepieId);
    if (!recipe) throw new ApiError(404, "Recipe not found");

    if (recipe.owner?.toString() !== userId.toString()) {
      throw new ApiError(403, "You are not authorized to update this recipe");
    }
    console.log(data);

    if (data.image) {
      const uploadResult = await uploadOnCloudinary(data.image);
      if (!uploadResult || !uploadResult.secure_url) {
        throw new ApiError(500, "Image upload failed");
      }
      recipe.image = uploadResult.secure_url;
    }

    Object.entries(data).forEach(([key, value]) => {
      
      if (key !== "image" && value !== undefined) {
        (recipe as any)[key] = value;
      }
    });
    
    await recipe.save();

    return recipe;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went Wrong");
  }
};

export const getAllRecepieService = async (offset: number, page: number) => {
  try {
    const recepies = await Recipe.find({ draft: false, public: true })
      .sort({ createdAt: -1 })
      .skip(page * offset)
      .limit(offset)
      .populate("owner", "profile username");
    return recepies;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went Wrong");
  }
};

export const getSingleRecepieService = async (recepieId: string) => {
  try {
    const recepie = await Recipe.findById(recepieId).populate(
      "owner",
      "profile username",
    );
    return recepie;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went Wrong");
  }
};

export const getUserRecpies = async (userId: Types.ObjectId) => {
  try {
    const userRecepies = await Recipe.find({ owner: userId });

    return userRecepies;
  } catch (error: any) {
    throw new ApiError(500, error.message || "Something went Wrong");
  }
};