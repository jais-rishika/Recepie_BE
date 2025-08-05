import { Router } from "express";
import { verifyJWT } from "../middlewares/jwt.middleware.js";
import {
  deleteFavRecepie,
  favRecepies,
  getFavRecepie,
} from "../controllers/favourite.controller.js";

const router = Router();

router.post("/:recepieId", verifyJWT, favRecepies);
router.delete("/:recepieId", verifyJWT, deleteFavRecepie);
router.get("/", verifyJWT, getFavRecepie);

export default router;
