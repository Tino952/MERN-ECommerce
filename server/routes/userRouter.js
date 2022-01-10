import express from "express";
import {
  loginUser,
  getUserProfile,
  registerUser,
  editUserProfile,
} from "../controllers/userController.js";
import protect from "../middelware/authmiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, editUserProfile);

export default router;
