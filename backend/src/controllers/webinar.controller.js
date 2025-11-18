import Webinar from "../models/webinar.model.js";
import User from "../models/user.model.js";
import dotenv from "dotenv";


dotenv.config();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// Create new webinar (Admin only)
export const createWebinar = async (req, res) => {
  try {
    const { title, description, host, trait, date, time, duration, meetingLink } = req.body;
    
    // Check if user is admin
    if (req.user.email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: "Only admin can create webinars" });
    }

    const webinar = new Webinar({
      title,
      description,
      host,
      trait,
      date,
      time,
      duration,
      meetingLink,
      createdBy: req.user._id,
    });

    await webinar.save();

    res.status(201).json(webinar);
  } catch (error) {
    console.error("Error in createWebinar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all webinars
export const getWebinars = async (req, res) => {
  try {
    const webinars = await Webinar.find()
      .populate("createdBy", "fullName email")
      .sort({ date: 1 });

    res.status(200).json(webinars);
  } catch (error) {
    console.error("Error in getWebinars:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Join a webinar
export const joinWebinar = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const webinar = await Webinar.findById(id);

    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    // Check if user already joined
    if (webinar.attendees.includes(userId)) {
      return res.status(400).json({ message: "Already registered for this webinar" });
    }

    webinar.attendees.push(userId);
    await webinar.save();

    res.status(200).json({ message: "Successfully registered for webinar", webinar });
  } catch (error) {
    console.error("Error in joinWebinar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a webinar (Admin only)
export const deleteWebinar = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user is admin
    if (req.user.email !== ADMIN_EMAIL) {
      return res.status(403).json({ message: "Only admin can delete webinars" });
    }

    const webinar = await Webinar.findByIdAndDelete(id);

    if (!webinar) {
      return res.status(404).json({ message: "Webinar not found" });
    }

    res.status(200).json({ message: "Webinar deleted successfully" });
  } catch (error) {
    console.error("Error in deleteWebinar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};