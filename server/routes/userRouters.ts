import express from "express";
import {
  signup,
  login,
  logout,
  protect,
  forgotPassword,
  resetPassword,
  updatePassword,
  verifyEmail,
  restrictTo,
} from "../controllers/authController";
import {
  getFriends,
  getMe,
  getUser,
  likeMovie,
} from "../controllers/userController";
import { uploadProfilePhotoAndResize } from "../controllers/userController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.get("/verifyEmail/:token", verifyEmail);

router.get("/me", getMe, getUser);
router.get("/:id", getUser);
router.get("/:id/friends", getFriends);

// Protect all routes after this middleware
router.use(protect);
router.patch("/likeMovie/:imdbID", likeMovie);
router.patch("/:id/:friendId, addRemoveFriend");

router.patch("/updateMyPassword", updatePassword);
router.patch("/uploadProfilePhoto", uploadProfilePhotoAndResize);

export default router;
