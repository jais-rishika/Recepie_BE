import {
  blockUser,
  getCurrUser,
  unblockUser,
  getBlockedUsers,
  getUserByUsername,
  getUserByuserId,
  updateCurrUser,
  updateProfile,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/jwt.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//secured Routes
router.get("/get-user-profile", verifyJWT, getCurrUser);
router.get("/blocked-users", verifyJWT, getBlockedUsers);
router.get("/get-user/:username", getUserByUsername);
router.get("/get-user/:userId", getUserByuserId);

router.patch("/update-curr-user", verifyJWT, updateCurrUser);
router.patch(
  "/update-user-profile",
  verifyJWT,
  upload.single("profile"),
  updateProfile,
);
router.post("/block-user", verifyJWT, blockUser);
router.post("/unblock-user", verifyJWT, unblockUser);

export default router;
