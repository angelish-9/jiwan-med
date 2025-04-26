import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from './../components/Navbar';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        'http://localhost:5000/api/cart/get',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        setCartItems(res.data.cart.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch cart items', err);
        setLoading(false);
      });
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );

    axios
      .post(
        'http://localhost:5000/api/cart/update',
        { id: itemId, quantity: newQuantity },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .catch((err) => {
        console.error('Failed to update item quantity', err);
      });
  };

  const increase = (itemId, currentQuantity) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const decrease = (itemId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  const removeItem = (productId) => {
    axios
      .post(
        'http://localhost:5000/api/cart/remove',
        { productId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        setCartItems(res.data.cart.items);
      })
      .catch((err) => {
        console.error('Failed to remove item', err);
      });
  };

  const calculateItemTotal = (item) => {
    return item.productId.price * item.quantity;
  };

  const calculateGrandTotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const proceedToCheckout = () => {
    if (cartItems.length > 0) {
      window.location.href = '/checkout';
    } else {
      alert('Your cart is empty. Add items to proceed.');
    }
  };

  if (loading) return <p className="text-center mt-20 text-lg">Loading cart...</p>;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <UserNavbar />
      </nav>

      <div className="mt-32 px-4 sm:px-8 lg:px-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is currently empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-md"
              >
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={`http://localhost:5000${item.productId.image}`}
                    alt={item.productId.name}
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                  <div className='text-left'>
                    <h4 className="font-semibold text-lg">{item.productId.name}</h4>
                    <p className="text-sm text-gray-500">${item.productId.price.toFixed(2)} each</p>
                    <p className="text-xs text-blue-500 mt-1">Est. Delivery: 1-3 days</p>
                    <p className="text-sm mt-1">
                      <span className="font-medium">Subtotal:</span>{' '}
                      ${calculateItemTotal(item).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decrease(item._id, item.quantity)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increase(item._id, item.quantity)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="text-red-500 hover:underline text-sm mt-2 md:mt-0"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Total section */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center mt-6">
              <p className="text-xl font-bold">
                Total: <span className="text-blue-600">${calculateGrandTotal().toFixed(2)}</span>
              </p>
              <button
                onClick={proceedToCheckout}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
