const express = require("express");
const {
  applyToJob,
  getStudentApplications,
  withdrawApplication,
  getCompanyApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");
const { verifyToken, studentOnly, companyOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/jobs/:jobId", verifyToken, studentOnly, applyToJob);
router.get("/mine", verifyToken, studentOnly, getStudentApplications);
router.patch("/:id/withdraw", verifyToken, studentOnly, withdrawApplication);
router.get("/company", verifyToken, companyOnly, getCompanyApplications);
router.patch("/:id/status", verifyToken, companyOnly, updateApplicationStatus);

module.exports = router;
