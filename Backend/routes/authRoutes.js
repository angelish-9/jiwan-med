import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// **Signup**
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// **SignIn**
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "5h" });

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.status(200).json({
      message: "Login successful", token, role: user.role, user: [
        user._id,         // User ID
        user.username,    // User Name
        user.email,       // User Email
        user.role         // User Role
      ]
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// **Logout**
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

export default router;
