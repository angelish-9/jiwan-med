import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import productRouter from "./routes/productRoute.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);  // Authentication routes
app.use("/api/products", productRouter);  // Product routes

// Example route for jokes
app.get("/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      question: "Why did the scarecrow win an award?",
      answer: "Because he was outstanding in his field.",
    },
    {
      id: 2,
      question: "How do you organize a space party?",
      answer: "You planet.",
    },
    {
      id: 3,
      question: "Why did the math book look sad?",
      answer: "Because it had too many problems.",
    },
  ];
  res.send(jokes);
});

// Start server after DB connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));
