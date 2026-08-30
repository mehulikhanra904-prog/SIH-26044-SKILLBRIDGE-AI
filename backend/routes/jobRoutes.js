const express = require("express");
const {
  createJob,
  getCompanyJobs,
  getJobById,
  updateJob,
  deleteJob,
  getRecommendedJobs,
} = require("../controllers/jobController");
const { verifyToken, companyOnly, studentOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/recommendations", verifyToken, studentOnly, getRecommendedJobs);
router.get("/mine", verifyToken, companyOnly, getCompanyJobs);
router.post("/", verifyToken, companyOnly, createJob);
router.get("/:id", verifyToken, getJobById);
router.put("/:id", verifyToken, companyOnly, updateJob);
router.delete("/:id", verifyToken, companyOnly, deleteJob);

module.exports = router;
