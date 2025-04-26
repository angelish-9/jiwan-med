import express from 'express';
import Message from '../models/Message.js';
import dotenv from 'dotenv';

const router = express.Router();

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

    // Check if the message already exists in the database
    const existingMessage = await Message.findOne({ senderId, receiverId, roomId, message });
    if (existingMessage) {
      return res.status(400).json({ message: 'Duplicate message' });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      senderName,
      receiverId,
      receiverName,
      message,
      roomId,
      timestamp: Date.now(),
    });

    // Save the message
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
