import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.route.js";
import postRoutes from "./src/routes/post.route.js"; 
import webinarRoutes from "./src/routes/webinar.route.js";
import counselorRoutes from "./src/routes/counselor.route.js";
import appointmentRoutes from "./src/routes/appointment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./src/lib/db.js";
import { v2 as cloudinary } from "cloudinary"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Trust proxy - IMPORTANT for cookies to work on Render
app.set('trust proxy', 1);

// Increase payload limit for media uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie']
  })
);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "MindCare API is running!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes); 
app.use("/api/webinars", webinarRoutes);
app.use("/api/counselors", counselorRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});