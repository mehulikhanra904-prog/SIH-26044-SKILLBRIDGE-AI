import express from "express";
import {
  getCompanyProfile,
  updateCompanyProfile,
} from "../controllers/companyController.js";
import { verifyToken, companyOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyToken, companyOnly, getCompanyProfile);
router.put("/profile", verifyToken, companyOnly, updateCompanyProfile);

export default router;
