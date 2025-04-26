import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UserNavbar from './../Navbar';
import AdminNavbar from './../../components/admin/Navbar';
import ProductCard from '../../components/ProductCard'
import product1 from '../../assets/product1.jpeg';
import product2 from '../../assets/product2.jpg';
import product3 from '../../assets/product3.jpg';
import product4 from '../../assets/product4.jpeg';
import { ToastContainer, toast } from 'react-toastify';

const SingleProduct = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const { productId } = useParams();
    const navigate = useNavigate();

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/single/${productId}`);
            if (response.data.success) {
                setProduct(response.data.product);
            } else {
                setError('Product not found');
            }
        } catch (err) {
            setError('Error fetching product data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleAddToCart = async () => {
        try {
            const cartData = {
                productId: product._id,
                quantity,
            };

            const response = await axios.post('http://localhost:5000/api/cart/add', cartData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                toast.success('Product added to cart!');
            } else {
                alert('Error adding product to cart');
            }
        } catch (err) {
            console.error(err);
            alert('Error adding product to cart');
        }
    };

    const handleRemoveProduct = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/products/remove',
                { id: productId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.data.success) {
                alert('Product removed successfully');
                navigate('/product-list');
            } else {
                alert('Error removing product');
            }
        } catch (err) {
            console.error(err);
            alert('Error removing product');
        }
    };

    if (loading) {
        return <div className="text-center text-xl font-semibold text-gray-700">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-xl font-semibold text-red-500">{error}</div>;
    }

    if (!product) {
        return <div className="text-center text-xl font-semibold text-gray-700">No product found.</div>;
    }

    const userRole = localStorage.getItem('role');
    const isAdmin = userRole === 'admin';

    // Product recommendations
    const recommendedProducts = [
        { image: product1, name: "Vitamin B Complex", rating: 5, reviews: 120, price: 99.99, stock: 15 },
        { image: product2, name: "Metformin Tablets", rating: 4, reviews: 85, price: 19.99, stock: 50 },
        { image: product3, name: "Tusq-D Cough Syrup", rating: 5, reviews: 200, price: 49.99, stock: 30 },
        { image: product4, name: "Desire Condom", rating: 5, reviews: 200, price: 49.99, stock: 30 }
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                {isAdmin ? <AdminNavbar /> : <UserNavbar />}
            </nav>
            <div className="mt-20" /> {/* to offset the fixed navbar height */}

            {isAdmin && (
                <div className="text-right mb-6 container mx-auto px-4">
                    <Link
                        to={`/admin/edit/${productId}`}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
                    >
                        Edit Product
                    </Link>
                    <button
                        onClick={handleRemoveProduct}
                        className="ml-4 bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-all transform hover:scale-105"
                    >
                        Remove Product
                    </button>
                </div>
            )}

            <section className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white shadow-xl rounded-xl p-6">
                    {/* Product Image */}
                    <div className="flex justify-center">
                        {product.image && product.image.length > 0 && (
                            <img
                                src={`http://localhost:5000${product.image[0]}`}
                                alt={product.name}
                                className="w-full max-w-xs h-auto object-cover border-4 border-blue-500 rounded-lg"
                            />
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="text-center md:text-left flex flex-col justify-between h-full">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>

                            {product.bestseller && (
                                <span className="inline-block bg-green-500 text-white text-xs font-semibold px-4 py-1 rounded-full mb-3">
                                    Bestseller
                                </span>
                            )}

                            <p className="text-base text-gray-700 mb-6 leading-relaxed">
                                {product.description || "No description available."}
                            </p>

                            <div className="flex justify-center md:justify-start items-center gap-3 mb-6">
                                <span className="text-xl font-bold text-gray-800">Rs.</span>
                                <span className="text-3xl font-extrabold text-black">{product.price.toFixed(2)}</span>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mt-4 mb-6">
                                <label className="block text-lg font-semibold text-gray-700 mb-2">Quantity:</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    min="1"
                                    className="p-2 w-24 text-center border border-gray-300 rounded-lg shadow-sm"
                                />
                            </div>

                            {/* Buy Now Button */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-red-500 text-white text-lg py-3 px-8 rounded-full hover:bg-red-600 transition-all"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Recommendations */}
            <section className="container mx-auto px-4 py-10">
                <h2 className="text-2xl font-bold text-center mb-6">Recommended Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                    {recommendedProducts.map((product, index) => (
                        <ProductCard key={index} {...product} />
                    ))}
                </div>
            </section>
        </>
    );
};

export default SingleProduct;
