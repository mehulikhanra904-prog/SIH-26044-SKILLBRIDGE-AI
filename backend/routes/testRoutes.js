// These are just demo/test routes to PROVE the role middleware works.
// Your teammates will replace/extend these with real student/college/company
// feature routes later — this shows them the pattern to follow.
import express from "express";
import { verifyToken, studentOnly, collegeOnly, companyOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/student/ping", verifyToken, studentOnly, (req, res) => {
  res.json({ message: "Hello student, you are authorized", userId: req.user.id });
});

router.get("/college/ping", verifyToken, collegeOnly, (req, res) => {
  res.json({ message: "Hello college, you are authorized", userId: req.user.id });
});

router.get("/company/ping", verifyToken, companyOnly, (req, res) => {
  res.json({ message: "Hello company, you are authorized", userId: req.user.id });
});

export default router;
