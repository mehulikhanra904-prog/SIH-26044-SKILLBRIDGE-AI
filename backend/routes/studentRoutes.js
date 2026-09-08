import express from "express";
import {
  getStudentProfile,
  updateStudentProfile,
  analyzeSkills,
  getCareerRoadmap,
} from "../controllers/studentController.js";
import { verifyToken, studentOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyToken, studentOnly, getStudentProfile);
router.put("/profile", verifyToken, studentOnly, updateStudentProfile);
router.get("/skills/analyze", verifyToken, studentOnly, analyzeSkills);
router.get("/roadmap", verifyToken, studentOnly, getCareerRoadmap);

export default router;
