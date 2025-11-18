import mongoose from "mongoose";

const counselorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    specialties: [
      {
        type: String,
        required: true,
      },
    ],
    availability: [
      {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      },
    ],
    languages: [
      {
        type: String,
        required: true,
      },
    ],
    institution: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    qualifications: [
      {
        type: String,
      },
    ],
    experience: {
      type: Number, 
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sessionFee: {
      type: Number,
      default: 0, 
      required: true,
    },
  },
  { timestamps: true }
);

const Counselor = mongoose.model("Counselor", counselorSchema);
export default Counselor;