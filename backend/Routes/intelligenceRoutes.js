import express from "express";
import {
  analyzeStudentProfile,
  getCareerRecommendations,
  generateCareerRoadmap
} from "../Controllers/intelligenceControllers.js";

const router = express.Router();

router.post("/analyze", analyzeStudentProfile);
router.post("/careers", getCareerRecommendations);
router.post("/roadmap", generateCareerRoadmap);

export default router;