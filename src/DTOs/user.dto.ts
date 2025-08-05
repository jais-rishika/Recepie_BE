import { Types, Document } from "mongoose";
import { User } from "../models/user.model";
export interface UserResponseDTO extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  profile?: string | null;
  extraDetails?: {
    bio?: string | null;
    favoriteFood?: string | null;
    favoriteCuisine?: string | null;
    signatureDish?: string | null;
    cookingLevel?: string | null;
    goToIngredient?: string | null;
    allergicTo?: string[] | null;
  } | null;
}

export interface GetUserDTO extends UserResponseDTO {
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  isPasswordCorrect: (password: string) => boolean;
  refreshToken: string;
  blockedUsers: Types.ObjectId[];
}
