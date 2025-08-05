import { GetUserDTO } from "../DTOs/user.dto";

export interface GetUser extends Document, GetUserDTO {}

export type PublicUser = Omit<GetUser, "password" | "refreshToken">;

export type ExtraUserDetails = {
  fullName?: string;
  bio?: string;
  favoriteFood?: string;
  favoriteCuisine?: string;
  signatureDish?: string;
  cookingLevel?: string;
  goToIngredient?: string;
  allergicTo?: string[];
};
