import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from 'url';
import path from 'path';

import cookieParser from "cookie-parser";
import userRouter from './routes/userRoute.js';
import authRoutes from "./routes/authRoutes.js";
import productRouter from "./routes/productRoute.js";

dotenv.config();
const app = express();

// Enable CORS with specific origins
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
};

app.use(cors(corsOptions));

// Get the current directory name using `import.meta.url`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (images) from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRouter);
app.use("/api/auth", authRoutes);  
app.use("/api/products", productRouter);  

// Start server after DB connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));
