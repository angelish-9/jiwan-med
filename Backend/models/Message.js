import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  senderName: String,
  receiverId: { type: String, required: true },
  roomId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Message', messageSchema);
