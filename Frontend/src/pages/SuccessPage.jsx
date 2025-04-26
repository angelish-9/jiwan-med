import React, { useEffect, useState } from 'react';
import UserNavbar from './../components/Navbar';
import { CheckCircle } from 'lucide-react';

const SuccessPage = () => {
  const [orderId, setOrderId] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState('');

  useEffect(() => {
    // Simulate generated order ID (replace with actual order ID if passing via state or API)
    const randomId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);

    // Simulate delivery logic
    const isEmergency = localStorage.getItem('deliveryOption') === 'emergency';
    const estimate = isEmergency ? 'within 2 hours' : 'in 24-48 hours';
    setDeliveryEstimate(estimate);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <UserNavbar />
      </nav>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-24 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full border-t-8 border-green-500">
          <CheckCircle className="text-green-500 mx-auto mb-4" size={60} />
          <h2 className="text-3xl font-extrabold text-green-600 mb-2">Order Confirmed 🎉</h2>
          <p className="text-gray-700 mb-2">Thank you for shopping with us!</p>

          <div className="bg-gray-100 p-4 rounded-lg text-left mt-6 text-sm text-gray-800">
            <p><span className="font-semibold">Order ID:</span> {orderId}</p>
            <p><span className="font-semibold">Estimated Delivery:</span> {deliveryEstimate}</p>
          </div>

          <a
            href="/"
            className="inline-block mt-6 bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
