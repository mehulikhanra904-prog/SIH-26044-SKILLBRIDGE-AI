import express from "express";
import { registerUser, loginUser, getMe } from "../Controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/auth/register
router.post("/register", registerUser);

// @route   POST /api/auth/login
router.post("/login", loginUser);

// @route   GET /api/auth/me
router.get("/me", verifyToken, getMe);

export default router;