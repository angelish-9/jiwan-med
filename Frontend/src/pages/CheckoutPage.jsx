import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from './../components/Navbar';
import PromoCodeForm from '../components/PromoCodeForm';
import { FaTruck, FaBolt } from 'react-icons/fa';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('standard');

  useEffect(() => {
    axios.post('http://localhost:5000/api/cart/get', {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(res => {
      const items = res.data.cart.items || [];
      setCartItems(items);
      const totalAmount = items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
      setTotal(totalAmount);
    }).catch(err => console.error("Failed to load cart", err));
  }, []);

  const handleDiscountUpdate = (newDiscountedTotal) => {
    setDiscountedTotal(newDiscountedTotal);
    setDiscountAmount(total - newDiscountedTotal);
  };

  const placeOrder = () => {
    if (!address || !phone) {
      alert("Please enter both address and phone number.");
      return;
    }

    axios.post('http://localhost:5000/api/order/place', {
      items: cartItems,
      total: discountedTotal ?? total,
      discountAmount,
      address,
      phone,
      deliveryOption,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(() => {
      alert('✅ Order placed successfully!');
      window.location.href = '/order-success';
    }).catch(err => {
      alert('❌ Failed to place order.');
      console.error(err);
    });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <UserNavbar />
      </nav>

      <div className="max-w-5xl mx-auto mt-28 p-6">
        <h2 className="text-3xl font-semibold mb-8 text-center">Your Basket</h2>

        <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow-md">
          {/* Left: Items & Delivery Info */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-6 border">
            <div>
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between text-gray-700 text-sm">
                  <span>{item.productId.name} × {item.quantity}</span>
                  <span>₹{(item.productId.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded border space-y-3">
              <p className="font-semibold text-gray-700">Delivery and Collection Info</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  value="standard"
                  checked={deliveryOption === 'standard'}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                />
                <FaTruck className="text-green-500" />
                <span>Standard Delivery (Free – 24-48 hrs)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  value="emergency"
                  checked={deliveryOption === 'emergency'}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                />
                <FaBolt className="text-red-500" />
                <span>Emergency Delivery (+₹100) – within 2 hrs</span>
              </label>
            </div>
          </div>

          {/* Right: Summary & Form */}
          <div className="bg-gray-100 p-6 rounded-lg border space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Basket Summary</h3>
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between text-sm text-gray-700">
                  <span>{item.productId.name}</span>
                  <span>₹{(item.productId.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-medium text-gray-800">
                <span>Delivery:</span>
                <span>{deliveryOption === 'emergency' ? '₹100' : 'Free'}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-blue-600 text-sm">
                  <span>Promo Discount:</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total:</span>
                <span>₹{(discountedTotal ?? total + (deliveryOption === 'emergency' ? 100 : 0)).toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code */}
            <PromoCodeForm
              totalAmount={total}
              setDiscountedAmount={handleDiscountUpdate}
            />

            {/* Address + Phone */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <button
              onClick={placeOrder}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
            >
              Continue
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-blue-600 underline cursor-pointer hover:text-blue-800">
          <a href="/cart">Back to Cart</a>
        </p>
      </div>
    </>
  );
};

export default CheckoutPage;
