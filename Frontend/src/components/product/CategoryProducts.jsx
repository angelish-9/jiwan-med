import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

import Navbar from './../Navbar';

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/list/${category.toLowerCase()}`);
        console.log('Fetched data:', res.data);
        setProducts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) return <p className="text-center text-gray-500 mt-6">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to add items to cart.');
        return;
      }
  
      const res = await axios.post(
        'http://localhost:5000/api/cart/add',
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Add to cart response:', res.data);
      alert('Product added to cart!');
    } catch (err) {
      console.error('Error adding to cart:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Failed to add to cart.');
    }
  };
  
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <Navbar />
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-10 mt-28">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 capitalize">
          Products in Category: {category.replaceAll('_', ' ')}
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <div
              key={product._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition flex flex-col justify-between"
            >
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-medium text-gray-900 mt-3">{product.name}</h3>
              <p className="text-red-600 text-left font-semibold mb-2">${product.price}</p>
            
              <div className="flex items-center justify-between mt-auto">
                <Link
                  to={`/product/${product._id}`}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Details
                </Link>
                <button
  className={`text-white text-sm px-3 py-1 rounded-full flex items-center gap-2 transition ${
    product.countInStock === 0
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-red-500 hover:bg-red-600'
  }`}
  disabled={product.countInStock === 0}
  onClick={() => handleAddToCart(product._id)}
>
  <FaShoppingCart size={14} />
  Add to Cart
</button>

              </div>
            </div>            
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
