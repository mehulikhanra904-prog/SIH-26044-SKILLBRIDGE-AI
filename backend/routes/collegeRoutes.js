import express from "express";
import { getProfile, updateProfile, listStudents, getAnalytics, getStudent } from "../controllers/collegeController.js";
import { verifyToken, collegeOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyToken, collegeOnly, getProfile);
router.put("/profile", verifyToken, collegeOnly, updateProfile);
router.get("/students", verifyToken, collegeOnly, listStudents);
router.get("/students/:id", verifyToken, collegeOnly, getStudent);
router.get("/analytics", verifyToken, collegeOnly, getAnalytics);

export default router;
