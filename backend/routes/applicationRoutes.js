import express from "express";
import {
  applyToJob,
  getStudentApplications,
  withdrawApplication,
  getCompanyApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import {
  verifyToken,
  studentOnly,
  companyOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/jobs/:jobId", verifyToken, studentOnly, applyToJob);
router.get("/mine", verifyToken, studentOnly, getStudentApplications);
router.patch("/:id/withdraw", verifyToken, studentOnly, withdrawApplication);
router.get("/company", verifyToken, companyOnly, getCompanyApplications);
router.patch("/:id/status", verifyToken, companyOnly, updateApplicationStatus);

export default router;
