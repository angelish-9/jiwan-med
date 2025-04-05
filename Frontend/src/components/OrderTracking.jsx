import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  
import axios from 'axios';

const OrderTracking = () => {
  const { orderId } = useParams(); // Get orderId from URL params
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    if (orderId) {
      axios.get(`http://localhost:5000/orders/${orderId}`)
        .then(response => {
          setOrderStatus(response.data.status);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  }, [orderId]);

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-2">Order Status</h2>
      <p className="text-gray-700">{orderStatus || "Fetching order status..."}</p>
    </div>
  );
};

export default OrderTracking;
