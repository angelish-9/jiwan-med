import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatComponent from './ChatComponent';
import Navbar from "../components/Navbar";

const PharmacistDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [uniqueSenders, setUniqueSenders] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/chat/messages')
      .then(response => {
        const messageData = response.data;

        // Use a Map to track unique senderIds and senderNames
        const uniqueSenderMap = new Map();

        // Loop through all messages and add unique senders
        messageData.forEach(msg => {
          if (!uniqueSenderMap.has(msg.senderId)) {
            uniqueSenderMap.set(msg.senderId, {
              senderId: msg.senderId,
              senderName: msg.senderName,
            });
          }
        });

        // Convert map values to an array
        setUniqueSenders([...uniqueSenderMap.values()]);
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  const handleChatSelect = (userId, userName) => {
    setCurrentChat({ receiverId: userId, receiverName: userName });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Pharmacist Dashboard</h1>
        <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Message List */}
          <div className="lg:w-1/3 border-r border-gray-200 h-96 overflow-y-auto">
            <div className="p-4 border-b bg-gray-100 font-semibold text-gray-700">
              All Messages
            </div>
            <ul className="divide-y divide-gray-100">
              {uniqueSenders.map((msg, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleChatSelect(msg.senderId, msg.senderName)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 focus:outline-none transition"
                  >
                    <div className="font-medium text-gray-800">{msg.senderName}</div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat Component */}
          <div className="lg:w-2/3 p-6">
            {currentChat ? (
              <ChatComponent
                receiverId={currentChat.receiverId}
                receiverName={currentChat.receiverName}
              />
            ) : (
              <div className="text-center text-gray-500 mt-10">
                Select a user to view the chat.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacistDashboard;
