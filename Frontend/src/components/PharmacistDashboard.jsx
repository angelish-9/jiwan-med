import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatComponent from './ChatComponent';  // Chat component to display the chat and reply

const PharmacistDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  // Fetch all messages from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/chat/messages')  // Replace with the correct API to get messages
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  // Handle selecting a chat
  const handleChatSelect = (userId, userName) => {
    setCurrentChat({ receiverId: userId, receiverName: userName });
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Pharmacist Dashboard</h1>
      <div className="flex">
        {/* List of all messages */}
        <div className="w-1/3 p-4 border-r">
          <h2 className="text-lg font-semibold mb-2">All Messages</h2>
          <ul className="space-y-2">
            {messages.map((msg, index) => (
              <li key={index}>
                <button
                  className="w-full text-left p-2 hover:bg-gray-100 rounded"
                  onClick={() => handleChatSelect(msg.senderId, msg.senderName)}
                >
                  Chat with {msg.senderName}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Display the selected chat */}
        {currentChat && (
          <div className="w-2/3 p-4">
            <ChatComponent
              receiverId={currentChat.receiverId}
              receiverName={currentChat.receiverName}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacistDashboard;

