const express = require("express");
const {
  createJob,
  getCompanyJobs,
  getJobById,
  updateJob,
  deleteJob,
  getRecommendedJobs,
  getPublishedJobs,
} = require("../controllers/jobController");
const { verifyToken, companyOnly, studentOnly, collegeOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/recommendations", verifyToken, studentOnly, getRecommendedJobs);
router.get("/published", verifyToken, collegeOnly, getPublishedJobs);
router.get("/mine", verifyToken, companyOnly, getCompanyJobs);
router.post("/", verifyToken, companyOnly, createJob);
router.get("/:id", verifyToken, getJobById);
router.put("/:id", verifyToken, companyOnly, updateJob);
router.delete("/:id", verifyToken, companyOnly, deleteJob);

export default router;
