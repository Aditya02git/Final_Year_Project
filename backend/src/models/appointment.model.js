import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    counselorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Counselor",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      enum: ["low", "medium", "high", "crisis"],
      required: true,
    },
    previousCounseling: {
      type: String,
      enum: ["no", "yes-helpful", "yes-mixed", "yes-unhelpful"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["free", "pending", "completed"],
      default: "free",
    },
    paymentAmount: {
      type: Number,
      default: 0,
    },
    sessionNotes: {
      type: String,
      default: "",
    },
    userInstitution: {
      type: String,
      required: true,
    },
    isFreeSession: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Index for efficient querying
appointmentSchema.index({ userId: 1, appointmentDate: 1 });
appointmentSchema.index({ counselorId: 1, appointmentDate: 1 });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;