import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

// Import routes
import userRouter from './routes/userRoute.js';
import authRoutes from './routes/authRoutes.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import chatRoutes from './routes/chatRoutes.js'; // <-- Add this route
import orderRouter from './routes/orderRoute.js'; // <-- Add this route

// Import Message model
import Message from './models/Message.js';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Frontend origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS options
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Serve static files from uploads/
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/chat', chatRoutes); 
app.use('/api/order', orderRouter);

// Socket.IO logic
io.on('connection', (socket) => {
  console.log(`🟢 New connection: ${socket.id}`);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`📥 Joined room: ${roomId}`);
  });

  socket.on('send_private_message', async (data) => {
    const { senderId, senderName, receiverId, message, roomId } = data;

    try {
      const newMessage = new Message({
        senderId,
        senderName,
        receiverId,
        roomId,
        message,
      });

      await newMessage.save();

      io.to(roomId).emit('receive_private_message', newMessage);
    } catch (error) {
      console.error('💥 Message save error:', error);
    }
  });

  socket.on('typing', (roomId) => {
    socket.to(roomId).emit('typing', roomId); // Broadcast to room when user is typing
  });

  socket.on('disconnect', () => {
    console.log(`🔴 Disconnected: ${socket.id}`);
  });
});

// MongoDB + Server Start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
