import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized! Please log in." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(token_decode.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// **Role-based Access**
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access Denied" });
  }
  next();
};

export const isDoctor = (req, res, next) => {
  if (req.user.role !== "doctor") {
    return res.status(403).json({ error: "Access Denied" });
  }
  next();
};
