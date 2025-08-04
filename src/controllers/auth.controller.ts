import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, user, "User registered successfully"));
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await loginUser(req.body);

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          { user, accessToken },
          "user Logged in Successfully",
        ),
      );
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});
