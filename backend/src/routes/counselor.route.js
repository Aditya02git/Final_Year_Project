import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { addCounselor, deleteCounselor, getCounselorById, getCounselors, updateCounselor } from "../controllers/counselor.controller.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getCounselors);
router.get("/:id", getCounselorById);

// Admin only routes
router.post("/", protectRoute, adminOnly, addCounselor);
router.put("/:id", protectRoute, adminOnly, updateCounselor);
router.delete("/:id", protectRoute, adminOnly, deleteCounselor);

export default router;