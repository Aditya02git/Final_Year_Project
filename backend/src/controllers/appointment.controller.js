import Appointment from "../models/appointment.model.js";
import Counselor from "../models/counselor.model.js";
import User from "../models/user.model.js";

// Create new appointment
export const createAppointment = async (req, res) => {
  try {
    const {
      counselorId,
      appointmentDate,
      timeSlot,
      reason,
      urgency,
      previousCounseling,
      paymentAmount, 
    } = req.body;
    
    const userId = req.user._id;
    
    // Validate counselor exists
    const counselor = await Counselor.findById(counselorId);
    if (!counselor) {
      return res.status(404).json({ message: "Counselor not found" });
    }
    
    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check if appointment slot is already booked
    const existingAppointment = await Appointment.findOne({
      counselorId,
      appointmentDate,
      timeSlot,
      status: { $ne: "cancelled" },
    });
    
    if (existingAppointment) {
      return res.status(400).json({ message: "This time slot is already booked" });
    }
    
    // Use the payment amount from frontend (which comes from counselor's sessionFee)
    const finalPaymentAmount = paymentAmount || counselor.sessionFee || 500;
    
    const newAppointment = new Appointment({
      userId,
      counselorId,
      appointmentDate,
      timeSlot,
      reason,
      urgency,
      previousCounseling,
      userInstitution: user.institution || "Unknown",
      isFreeSession: finalPaymentAmount === 0,
      paymentAmount: finalPaymentAmount,
      paymentStatus: finalPaymentAmount === 0 ? "free" : "pending",
      status: "pending",
    });
    
    await newAppointment.save();
    
    // Populate counselor details
    await newAppointment.populate("counselorId", "name email institution specialties profilePic sessionFee");
    
    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error in createAppointment:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user's appointments
export const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const appointments = await Appointment.find({ userId })
      .populate("counselorId", "name email institution specialties profilePic sessionFee")
      .sort({ appointmentDate: -1 });
    
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error in getUserAppointments:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get counselor's appointments
export const getCounselorAppointments = async (req, res) => {
  try {
    const { counselorId } = req.params;
    
    const appointments = await Appointment.find({ counselorId })
      .populate("userId", "fullName email profilePic institution")
      .sort({ appointmentDate: -1 });
    
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error in getCounselorAppointments:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get ALL appointments (Admin only)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("counselorId", "name email institution specialties profilePic sessionFee")
      .populate("userId", "fullName email profilePic institution")
      .sort({ createdAt: -1 });
    
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error in getAllAppointments:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("counselorId", "name email institution specialties profilePic sessionFee")
      .populate("userId", "fullName email profilePic institution");
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    // Check if user is authorized to view this appointment
    if (appointment.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error in getAppointmentById:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, sessionNotes } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, sessionNotes },
      { new: true }
    ).populate("counselorId", "name email institution sessionFee");
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    res.status(200).json({
      message: "Appointment status updated successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error in updateAppointmentStatus:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    
    // Check if user is authorized to cancel
    if (appointment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    
    // Check if appointment can be cancelled (e.g., not within 24 hours)
    const appointmentDate = new Date(appointment.appointmentDate);
    const now = new Date();
    const hoursDifference = (appointmentDate - now) / (1000 * 60 * 60);
    
    if (hoursDifference < 24 && appointment.status !== "pending") {
      return res.status(400).json({ 
        message: "Cannot cancel appointment less than 24 hours before scheduled time" 
      });
    }
    
    appointment.status = "cancelled";
    await appointment.save();
    
    res.status(200).json({
      message: "Appointment cancelled successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error in cancelAppointment:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};