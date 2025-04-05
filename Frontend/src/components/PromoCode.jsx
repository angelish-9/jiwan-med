import { useState } from 'react';
import axios from 'axios';

const PromoCode = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleRedeem = () => {
    axios.post('http://localhost:5000/promoCodes/redeem', { code })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(() => {
        setMessage('Invalid Promo Code');
      });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter Promo Code" className="w-full p-2 mb-2 border rounded" />
      <button onClick={handleRedeem} className="w-full p-2 bg-blue-500 text-white rounded">Redeem</button>
      {message && <p className="mt-2 text-green-500">{message}</p>}
    </div>
  );
};

export default PromoCode;
