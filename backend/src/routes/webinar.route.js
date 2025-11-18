import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createWebinar,
  getWebinars,
  joinWebinar,
  deleteWebinar,
} from "../controllers/webinar.controller.js";

const router = express.Router();

router.get("/", protectRoute, getWebinars);
router.post("/", protectRoute, createWebinar);
router.post("/:id/join", protectRoute, joinWebinar);
router.delete("/:id", protectRoute, deleteWebinar);

export default router;