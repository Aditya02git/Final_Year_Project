import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";
import { 
  cancelAppointment, 
  createAppointment, 
  getAppointmentById, 
  getCounselorAppointments, 
  getUserAppointments, 
  updateAppointmentStatus,
  getAllAppointments 
} from "../controllers/appointment.controller.js";

const router = express.Router();

// All routes require authentication
router.use(protectRoute);

router.post("/", createAppointment);
router.get("/user", getUserAppointments);
router.get("/all", adminOnly, getAllAppointments); // Admin route to get all appointments
router.get("/counselor/:counselorId", getCounselorAppointments);
router.get("/:id", getAppointmentById);
router.put("/:id/status", updateAppointmentStatus);
router.delete("/:id", cancelAppointment);

export default router;