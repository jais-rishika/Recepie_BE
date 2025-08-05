import { Router } from "express";
import { verifyJWT } from "../middlewares/jwt.middleware.js";
import { commentOnRecepie, commentsOfRecepie } from "../controllers/comment.contoller.js";

const router = Router();

router.post("/comment-recepie/:recepieId", verifyJWT, commentOnRecepie);
router.get("/:recepieId",commentsOfRecepie)

export default router;
