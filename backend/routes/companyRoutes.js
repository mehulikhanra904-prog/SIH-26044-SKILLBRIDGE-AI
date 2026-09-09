import express from "express";
import { getCompanyProfile, updateCompanyProfile } from "../controllers/companyController.js";
import { verifyToken, companyOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/profile")
  .get(verifyToken, companyOnly, getCompanyProfile)
  .put(verifyToken, companyOnly, updateCompanyProfile);

export default router;