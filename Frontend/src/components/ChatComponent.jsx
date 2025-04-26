import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import Navbar from "../components/Navbar";

const socket = io("http://localhost:5000");

const ChatComponent = ({ receiverId, receiverName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user[0];
  const userName = user[1];
  const userRole = user[3]
  const roomId = [userId, receiverId].sort().join("_");

  useEffect(() => {
    socket.emit("join_room", roomId);

    axios
      .get(`http://localhost:5000/api/chat/history/${roomId}`)
      .then((response) => setMessages(response.data))
      .catch((err) => console.error("Error fetching chat history:", err));

    socket.on("receive_private_message", (data) => {
      if (data.roomId === roomId) {
        setMessages((prev) => [...prev, data]);
      }
    });

    socket.on("typing", (incomingRoomId) => {
      if (incomingRoomId === roomId) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1000);
      }
    });

    return () => {
      socket.off("receive_private_message");
      socket.off("typing");
    };
  }, [roomId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("senderId", userId);
    formData.append("senderName", userName);
    formData.append("receiverId", receiverId);
    formData.append("roomId", roomId);

    try {
      const res = await axios.post("http://localhost:5000/api/chat/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const savedMessage = res.data;

      socket.emit("send_private_message", savedMessage);

    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };


  const sendMessage = async () => {
    if (!message.trim() || isSending) return;
    setIsSending(true);

    const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    try {
      // Save to database
      const res = await axios.post("http://localhost:5000/api/chat/messages", {
        senderId: userId,
        senderName: userName,
        receiverId,
        roomId,
        message: sanitizedMessage,
      });

      const savedMessage = res.data;

      // Just emit via socket
      socket.emit("send_private_message", savedMessage);

      setMessage("");
    } catch (err) {
      console.error("Send failed:", err);
    } finally {
      setIsSending(false);
    }
  };


  const handleTyping = () => {
    socket.emit("typing", roomId);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <>
      {userRole !== "pharmacist" ? (
        <Navbar />
      ) : ''}

      <div className="chat-container p-4 max-w-3xl mx-auto">
        <h2 className="font-semibold text-xl mb-4">Chat with {receiverName}</h2>

        <div className="message-area h-64 overflow-y-auto border p-2 mb-2 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-item mb-1 ${msg.senderId === userId ? "text-right" : "text-left"
                }`}
            >
              <strong>{msg.senderName}:</strong>
              {msg.imageUrl ? (
                <img src={`http://localhost:5000/${msg.imageUrl}`} alt="Sent" className="max-w-xs mx-auto my-2" />
              ) : (
                msg.message
              )}
              <div className="text-xs text-gray-500">
                ({new Date(msg.timestamp).toLocaleTimeString()})
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {isTyping && (
          <div className="text-sm text-gray-400">Receiver is typing...</div>
        )}

        <div className="input-area mt-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            className="border p-2 w-full"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-1 mt-2 w-full"
            disabled={isSending}
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </div>

      </div>
    </>
  );
};

export default ChatComponent;
