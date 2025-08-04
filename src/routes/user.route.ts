import { Router } from "express";
import { blockUser, followUser, getBlockedUsers, getCurrUser, getFollowerFollowingSize, getFollowers, getFollowing, unblockUser, unfollowUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/jwt.middleware.js";

const router = Router();

//secured Routes
router.get("/get-curr-user", verifyJWT, getCurrUser);
router.get("/get-followers", verifyJWT, getFollowers);
router.get("/get-following", verifyJWT, getFollowing);
router.get("/get-follow-following-count", verifyJWT, getFollowerFollowingSize);
router.get("/blocked-users",verifyJWT,getBlockedUsers);

router.post("/follow-user",verifyJWT, followUser);
router.post("/unfollow-user",verifyJWT,unfollowUser);
router.post("/block-user", verifyJWT, blockUser);
router.post("/unblock-user", verifyJWT, unblockUser);

export default router;
