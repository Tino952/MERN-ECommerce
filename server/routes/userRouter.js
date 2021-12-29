import express from "express";
import { getUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", getUser);

export default router;
