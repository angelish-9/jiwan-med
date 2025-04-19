import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from './../components/Navbar';
import PromoCodeForm from '../components/PromoCodeForm';

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
    }).catch(err => {
      console.error("Failed to load cart", err);
    });
  }, []);

  const handleDiscountUpdate = (newDiscountedTotal) => {
    setDiscountedTotal(newDiscountedTotal);
    setDiscountAmount(total - newDiscountedTotal);
  };

  const placeOrder = () => {
    if (!address || !phone) {
      alert("Please fill in both address and phone number.");
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
    }).then(res => {
      alert('Order placed successfully!');
      window.location.href = '/order-success';
    }).catch(err => {
      alert('Failed to place order.');
      console.error(err);
    });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <UserNavbar />
      </nav>
      <div className="max-w-3xl mt-28 mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        {cartItems.map(item => (
          <div key={item._id} className="flex justify-between mb-2">
            <span>{item.productId.name} x {item.quantity}</span>
            <span>₹{(item.productId.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <hr className="my-4" />

        <p className="text-lg font-semibold mb-2">Total: ₹{total.toFixed(2)}</p>
        {discountAmount > 0 && (
          <p className="text-green-600 mb-2">Discount: ₹{discountAmount.toFixed(2)}</p>
        )}
        {discountedTotal !== null && (
          <p className="text-xl font-bold mb-4">Final Amount: ₹{discountedTotal.toFixed(2)}</p>
        )}

        {/* Promo Code Form */}
        <PromoCodeForm
          totalAmount={total}
          setDiscountedAmount={handleDiscountUpdate}
        />

        <div className="mb-4 mt-6">
          <label className="block font-medium mb-2">Select Delivery Option:</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="delivery"
                value="standard"
                checked={deliveryOption === 'standard'}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              Standard Delivery (24-48 hrs)
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="delivery"
                value="emergency"
                checked={deliveryOption === 'emergency'}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              Emergency Delivery (within 2 hrs)
            </label>
          </div>
        </div>

        <input
          type="text"
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          onClick={placeOrder}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Place Order
        </button>
      </div>
    </>
  );
};

export default CheckoutPage;
