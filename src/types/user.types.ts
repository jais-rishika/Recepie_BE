import { GetUserDTO } from "../DTOs/user.dto";

export interface GetUser extends Document, GetUserDTO{};

export type PublicUser= Omit<GetUser, "password" | "refreshToken">;