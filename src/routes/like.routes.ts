import { Router } from "express";
import { verifyJWT } from "../middlewares/jwt.middleware.js";
import { likeRecepie, unlikeRecepie } from "../controllers/like.controller.js";

const router = Router();

router.post("/like-recepie/:recepieId", verifyJWT, likeRecepie);
router.delete("/unlike-recepie/:recepieId", verifyJWT, unlikeRecepie);

export default router;
