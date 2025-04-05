import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  const handleSendMessage = () => {
    socket.emit('chatMessage', message);
    setMessage('');
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <div className="h-64 overflow-y-auto border rounded p-2">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 border-b">{msg}</div>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 mb-2 border rounded" />
      <button onClick={handleSendMessage} className="w-full p-2 bg-blue-500 text-white rounded">Send</button>
    </div>
  );
};

export default Chat;
