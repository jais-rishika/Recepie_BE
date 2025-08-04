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
  bio?: string;
  favoriteFood?: string;
  favoriteCuisine?: string;
  signatureDish?: string;
  cookingLevel?: string;
  goToIngredient?: string;
  allergicTo?: string;
}

export interface GetUserDTO extends UserResponseDTO {
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  isPasswordCorrect: (password: string) => boolean;
  refreshToken: string;
  blockedUsers: Types.ObjectId[];
}
