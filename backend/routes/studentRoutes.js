import express from "express";
import {
  getStudentProfile,
  updateStudentProfile,
  analyzeSkills,
  getCareerRoadmap,
} from "../controllers/studentController.js";
import { verifyToken, studentOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/skill-gap", verifyToken, studentOnly, analyzeSkills);
router.get("/roadmap", verifyToken, studentOnly, getCareerRoadmap);

// verifyToken attaches the logged-in user to req.user; studentOnly prevents
// college and company accounts from reading or changing a student profile.
router
  .route("/profile")
  .get(verifyToken, studentOnly, getStudentProfile)
  .put(verifyToken, studentOnly, updateStudentProfile);

export default router;
