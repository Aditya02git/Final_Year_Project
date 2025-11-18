import Counselor from "../models/counselor.model.js";
import { v2 as cloudinary } from "cloudinary";

// Get all counselors with optional filtering
export const getCounselors = async (req, res) => {
  try {
    const { institution, specialty, language } = req.query;
    
    let filter = { isActive: true };
    
    if (institution && institution !== "All") {
      filter.institution = institution;
    }
    
    if (specialty) {
      filter.specialties = { $in: [specialty] };
    }
    
    if (language) {
      filter.languages = { $in: [language] };
    }
    
    const counselors = await Counselor.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json(counselors);
  } catch (error) {
    console.error("Error in getCounselors:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get counselor by ID
export const getCounselorById = async (req, res) => {
  try {
    const counselor = await Counselor.findById(req.params.id);
    
    if (!counselor) {
      return res.status(404).json({ message: "Counselor not found" });
    }
    
    res.status(200).json(counselor);
  } catch (error) {
    console.error("Error in getCounselorById:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add new counselor (Admin only)
export const addCounselor = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    
    const {
      name,
      email,
      specialties,
      availability,
      languages,
      institution,
      profilePic,
      bio,
      qualifications,
      experience,
      sessionFee,
    } = req.body;
    
    // Validate required fields
    if (!name || !email || !institution) {
      return res.status(400).json({ 
        message: "Missing required fields: name, email, or institution" 
      });
    }
    
    if (!specialties || specialties.length === 0) {
      return res.status(400).json({ 
        message: "At least one specialty is required" 
      });
    }
    
    if (!languages || languages.length === 0) {
      return res.status(400).json({ 
        message: "At least one language is required" 
      });
    }
    
    if (!sessionFee && sessionFee !== 0) {
      return res.status(400).json({ 
        message: "Session fee is required" 
      });
    }
    
    // Check if counselor already exists
    const existingCounselor = await Counselor.findOne({ email });
    if (existingCounselor) {
      return res.status(400).json({ 
        message: "Counselor with this email already exists. Please use a different email or update the existing counselor." 
      });
    }
    
    // Handle profile picture upload to Cloudinary
    let uploadedProfilePic = "/placeholder-user.jpg";
    
    if (profilePic && profilePic.startsWith("data:image")) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
          folder: "counselor_profiles",
        });
        uploadedProfilePic = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        return res.status(500).json({ 
          message: "Failed to upload profile picture" 
        });
      }
    } else if (profilePic && profilePic !== "/placeholder-user.jpg") {
      // If it's a URL (not base64), use it directly
      uploadedProfilePic = profilePic;
    }
    
    const newCounselor = new Counselor({
      name,
      email,
      specialties,
      availability,
      languages,
      institution,
      profilePic: uploadedProfilePic,
      bio: bio || "",
      qualifications: qualifications || [],
      experience: experience || 0,
      sessionFee,
    });
    
    console.log("Creating counselor:", newCounselor);
    
    await newCounselor.save();
    
    console.log("Counselor saved successfully");
    
    res.status(201).json({
      message: "Counselor added successfully",
      counselor: newCounselor,
    });
  } catch (error) {
    console.error("Error in addCounselor:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: "Validation error",
        errors: messages 
      });
    }
    
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};

// Update counselor (Admin only)
export const updateCounselor = async (req, res) => {
  try {
    const { profilePic, ...otherData } = req.body;
    
    let updateData = { ...otherData };
    
    // Handle profile picture upload to Cloudinary if it's a new base64 image
    if (profilePic && profilePic.startsWith("data:image")) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(profilePic, {
          folder: "counselor_profiles",
        });
        updateData.profilePic = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        return res.status(500).json({ 
          message: "Failed to upload profile picture" 
        });
      }
    } else if (profilePic) {
      // If it's already a URL, keep it
      updateData.profilePic = profilePic;
    }
    
    const counselor = await Counselor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!counselor) {
      return res.status(404).json({ message: "Counselor not found" });
    }
    
    res.status(200).json({
      message: "Counselor updated successfully",
      counselor,
    });
  } catch (error) {
    console.error("Error in updateCounselor:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete counselor (Admin only - soft delete)
export const deleteCounselor = async (req, res) => {
  try {
    const counselor = await Counselor.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!counselor) {
      return res.status(404).json({ message: "Counselor not found" });
    }
    
    res.status(200).json({ message: "Counselor deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCounselor:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};