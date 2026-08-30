const express = require("express");
const { getStudentProfile, updateStudentProfile } = require("../controllers/studentController");
const { verifyToken, studentOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// verifyToken attaches the logged-in user to req.user; studentOnly prevents
// college and company accounts from reading or changing a student profile.
router
  .route("/profile")
  .get(verifyToken, studentOnly, getStudentProfile)
  .put(verifyToken, studentOnly, updateStudentProfile);

module.exports = router;
