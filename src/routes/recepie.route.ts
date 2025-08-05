import { Router } from "express";
import { verifyJWT } from "../middlewares/jwt.middleware.js";
import {
  createRecepie,
  deleteRecepie,
  getAllRecepies,
  getSingleRecepie,
  updateRecepie,
  userRecepies,
} from "../controllers/recepie.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
  "/create-recipie",
  verifyJWT,
  upload.single("image"),
  createRecepie,
);

router.delete("/delete-recipie/:recepieId", verifyJWT, deleteRecepie);
router.get("/", getAllRecepies);
router.get("/:recepieId", getSingleRecepie);
router.patch("/update-recepie/:recepieId", verifyJWT,upload.single("image"), updateRecepie);
router.get("/user-recepies", verifyJWT, userRecepies);

export default router;
