import { Router } from "express";
import { verifyJWT } from "../middlewares/jwt.middleware.js";
import {
  getFollowers,
  getFollowing,
  getFollowerFollowingSize,
  followUser,
  unfollowUser,
} from "../controllers/follow.controller.js";

const router = Router();

router.get("/get-followers", verifyJWT, getFollowers);
router.get("/get-following", verifyJWT, getFollowing);
router.get("/get-follow-following-count", verifyJWT, getFollowerFollowingSize);

router.post("/follow-user", verifyJWT, followUser);
router.post("/unfollow-user", verifyJWT, unfollowUser);

//check mutuals maybe for later

export default router;
