import { analyzeSkills } from "../intelligence/skillAnalyzer.js";
import { recommendCareers } from "../intelligence/careerRecommender.js";
import { generateCareerRoadmap as generateCareerRoadmapFromAI } from "../intelligence/roadmapGenerator.js";

export const analyzeStudentProfile = async (req, res) => {
  try {
    const payload = req.body || {};
    const response = await analyzeSkills(payload);

    return res.status(200).json({
      success: true,
      response
    });
  } catch (error) {
    console.error("Skill Intelligence Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze student skills",
      error: error.message
    });
  }
};

export const getCareerRecommendations = async (req, res) => {
  try {
    const payload = req.body || {};
    const response = await recommendCareers(payload);

    return res.status(200).json({
      success: true,
      response
    });
  } catch (error) {
    console.error("Career Recommendation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate career recommendations",
      error: error.message
    });
  }
};

export const generateCareerRoadmap = async (req, res) => {
  try {
    const payload = req.body || {};
    const response = await generateCareerRoadmapFromAI(payload);

    return res.status(200).json({
      success: true,
      response
    });
  } catch (error) {
    console.error("Roadmap Generation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate career roadmap",
      error: error.message
    });
  }
};