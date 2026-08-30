const express = require("express");
const { getCompanyProfile, updateCompanyProfile } = require("../controllers/companyController");
const { verifyToken, companyOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/profile")
  .get(verifyToken, companyOnly, getCompanyProfile)
  .put(verifyToken, companyOnly, updateCompanyProfile);

module.exports = router;
