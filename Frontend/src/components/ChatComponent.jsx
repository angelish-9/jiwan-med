import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [senders, setSenders] = useState([]);
  const [selectedSender, setSelectedSender] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [isSending, setIsSending] = useState(false); // To track if a message is being sent

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user[0];
  const userName = user[1];
  const userRole = user[3];
  const pharmacistId = '67fa35639fe7c1d32b2f8800';

  const sanitizeMessage = (message) => {
    const element = document.createElement('div');
    element.innerText = message;
    return element.innerHTML;
  };

  const getRoomId = (id1, id2) => {
    return [id1, id2].sort().join('_');
  };

  useEffect(() => {
    const roomId = getRoomId(userId, pharmacistId);

    if (userRole === 'pharmacist') {
      console.log(userRole === 'pharmacist')
      axios.get(`http://localhost:5000/api/chat/senders/${pharmacistId}`)
        .then(res => setSenders(res.data))
        .catch(err => console.error('Error loading senders:', err));

      socket.on('receive_private_message', (data) => {
        if (data.receiverId === userId) {

          console.log('-');
          console.log(data.receiverId === userId);
          setSenders(prev => {
            const exists = prev.some(s => s.senderId === data.senderId);
            if (!exists) {
              return [...prev, { senderId: data.senderId, senderName: data.senderName }];
            }
            return prev;
          });

          setUnreadCounts(prev => ({
            ...prev,
            [data.senderId]: (prev[data.senderId] || 0) + 1
          }));
        }
      });

    } else {
      // Join room and load chat for non-pharmacist
      socket.emit('join_room', roomId);

      axios.get(`http://localhost:5000/api/chat/history/${roomId}`)
        .then(response => setMessages(response.data))
        .catch(err => console.error('Error fetching chat history:', err));

      socket.on('receive_private_message', (data) => {
        if (data.roomId === roomId) {
          setMessages(prev => [...prev, data]);
        }
      });
    }

    socket.on('typing', (incomingRoomId) => {
      if (incomingRoomId === roomId) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 1000);
      }
    });

    return () => {
      socket.off('receive_private_message');
      socket.off('typing');
    };
  }, [userId, userRole]);

  const openChat = (sender) => {
    const roomId = getRoomId(userId, sender.senderId || sender.id);
    setSelectedSender(sender);
    setMessages([]);

    socket.emit('join_room', roomId);

    axios.get(`http://localhost:5000/api/chat/history/${roomId}`)
      .then(response => setMessages(response.data))
      .catch(err => console.error('Error fetching chat history:', err));

    setUnreadCounts(prev => ({
      ...prev,
      [sender.senderId]: 0
    }));
  };

  const sendMessage = () => {
    if (!message.trim() || isSending) return; // Prevent sending if already sending a message

    setIsSending(true); // Mark as sending

    const receiverId = userRole === 'pharmacist' ? selectedSender.senderId : pharmacistId;
    const roomId = getRoomId(userId, receiverId);
    const sanitized = sanitizeMessage(message);

    const data = {
      senderId: userId,
      senderName: userName,
      receiverId,
      roomId,
      message: sanitized
    };

    socket.emit('send_private_message', data);

    axios.post('http://localhost:5000/api/chat/messages', data)
      .then(res => {
        setMessages(prev => [...prev, res.data]);
        setMessage('');
      })
      .catch(err => console.error('Send failed:', err))
      .finally(() => {
        setIsSending(false); // Reset the sending state after the message is sent
      });
  };

  const handleTyping = () => {
    const receiverId = userRole === 'pharmacist' ? selectedSender?.senderId : pharmacistId;
    if (!receiverId) return;

    const roomId = getRoomId(userId, receiverId);
    socket.emit('typing', roomId);
  };

  // === PHARMACIST UI ===
  if (userRole === 'pharmacist') {
    return (
      <div className="flex gap-4">
        <div className="w-1/3 border p-3">
          <h2 className="font-semibold mb-2">Senders</h2>
          {senders.length === 0 && <p className="text-sm text-gray-500">No senders yet</p>}
          {senders.map((sender, i) => (
            <div
              key={i}
              className="cursor-pointer p-2 border-b hover:bg-gray-100 flex justify-between items-center"
              onClick={() => openChat(sender)}
            >
              <span>{sender.senderName || sender.name}</span>
              {unreadCounts[sender.senderId] > 0 && (
                <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
                  {unreadCounts[sender.senderId]}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="w-2/3 border p-3">
          {selectedSender ? (
            <>
              <h2 className="text-lg font-semibold mb-2">Chat with {selectedSender.senderName || selectedSender.name}</h2>
              <div className="h-48 overflow-y-auto border p-2 mb-2 bg-gray-50">
                {messages.map((msg, i) => (
                  <div key={i} className={`mb-1 ${msg.senderId === userId ? 'text-right' : 'text-left'}`}>
                    <strong>{msg.senderName}:</strong> {msg.message}
                    <div className="text-xs text-gray-500">
                      ({new Date(msg.timestamp).toLocaleTimeString()})
                    </div>
                  </div>
                ))}
              </div>
              {isTyping && <div className="text-sm text-gray-400">Typing...</div>}
              <input
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  handleTyping();
                }}
                className="border p-1 w-full mb-2"
                placeholder="Type message..."
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-1 w-full"
                disabled={isSending} // Disable button if sending is in progress
              >
                {isSending ? 'Sending...' : 'Send'}
              </button>
            </>
          ) : (
            <p>Select a sender to start chatting</p>
          )}
        </div>
      </div>
    );
  }

  // === NON-PHARMACIST UI ===
  return (
    <div className="p-4 border rounded w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Message with Pharmacist</h2>
      <div className="h-48 overflow-y-auto border p-2 mb-2 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-1 ${msg.senderId === userId ? 'text-right' : 'text-left'}`}>
            <strong>{msg.senderName}:</strong> {msg.message}
            <div className="text-xs text-gray-500">
              ({new Date(msg.timestamp).toLocaleTimeString()})
            </div>
          </div>
        ))}
      </div>
      {isTyping && <div className="text-sm text-gray-400">Pharmacist is typing...</div>}
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          handleTyping();
        }}
        className="border p-2 w-full mb-2"
        placeholder="Type your message..."
      />
      <button
        onClick={sendMessage}
        className="bg-green-600 text-white w-full py-1"
        disabled={isSending} // Disable button if sending is in progress
      >
        {isSending ? 'Sending...' : 'Send Message'}
      </button>
    </div>
  );
};

export default ChatComponent;
