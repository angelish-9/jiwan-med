import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import Message from '../models/Message.js';
import dotenv from 'dotenv';

// Set storage for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/chat_images/';

    // Check if folder exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

// Upload image route
router.post('/upload-image', upload.single('image'), async (req, res) => {
  const { senderId, senderName, receiverId, roomId } = req.body;
  console.log('Received image upload:', req.body);

  if (!req.file) return res.status(400).send('No image uploaded.');

  const newMessage = new Message({
    senderId,
    senderName,
    receiverId,
    roomId,
    message: "", // Empty text
    imageUrl: req.file.path,
    timestamp: new Date(),
  });

  await newMessage.save();

  res.json(newMessage);
});

router.get('/messages', async (req, res) => {
  try {
    // Get the pharmacist's ID from the environment variable
    const pharmacistId = process.env.PHARMACIST_ID;

    // Fetch messages from the database for the logged-in pharmacist
    const messages = await Message.find({ receiverId: pharmacistId });  // Filter by pharmacist's ID
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/chat/history/:roomId
router.get('/history/:roomId', async (req, res) => {
  try {
    const messages = await Message.find({ roomId: req.params.roomId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST /api/chat/messages
router.post('/messages', async (req, res) => {
  try {
    const { senderId, receiverId, senderName, receiverName, message, roomId } = req.body;

    const newMessage = new Message({
      senderId,
      senderName,
      receiverId,
      receiverName,
      message,
      roomId,
      timestamp: Date.now(),
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/chat/senders/:pharmistId
router.get('/senders/:pharmistId', async (req, res) => {
  const { pharmistId } = req.params;

  try {
    const messages = await Message.find({ receiverId: pharmistId });

    const uniqueSendersMap = {};

    messages.forEach((msg) => {
      if (!uniqueSendersMap[msg.senderId]) {
        uniqueSendersMap[msg.senderId] = {
          senderId: msg.senderId,
          senderName: msg.senderName,
        };
      }
    });

    const uniqueSenders = Object.values(uniqueSendersMap);

    res.json(uniqueSenders);
  } catch (err) {
    console.error('Error fetching senders:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
