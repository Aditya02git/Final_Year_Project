import dotenv from "dotenv";

dotenv.config();

export const adminOnly = (req, res, next) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (req.user.email !== adminEmail) {
    return res.status(403).json({ 
      message: "Access denied. Admin privileges required." 
    });
  }
  
  next();
};