import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // For navigation

import { NavLink } from 'react-router-dom';
import { BiPlusCircle } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { MdList } from 'react-icons/md';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');  // Get token from localStorage


    // Fetch the list of products
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                setError('No products found');
            }
        } catch (err) {
            setError('Error fetching products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch products when component mounts
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex gap-4 min-h-screen bg-gray-100">
                {userRole === 'admin' && (
                    <>
                        <div>

                            <p className="text-center text-lg font-bold mb-4">Admin Panel</p>
                            <div className="w-[18%] border-r-2 bg-white">
                                <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
                                    <NavLink
                                        className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
                                        to="/admin/add"
                                    >
                                        <BiPlusCircle size={30} />
                                        <p className="hidden md:block">Add Items</p>
                                    </NavLink>
                                    <NavLink
                                        className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
                                        to="/list-product"
                                    >
                                        <MdList size={30} />
                                        <p className="hidden md:block">List Items</p>
                                    </NavLink>
                                    <NavLink
                                        className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
                                        to="/admin/orders"
                                    >
                                        <HiOutlineReceiptRefund size={30} />
                                        <p className="hidden md:block">Orders</p>
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                    </>
                )}

                <h2 className="text-2xl mb-4">Product List</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="border p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold">{product.name}</h3>
                                <p className="text-sm">{product.description}</p>
                                <p className="font-semibold">${product.price}</p>
                                {product.bestseller && (
                                    <span className="text-xs text-white bg-green-500 px-2 py-1 rounded-full">
                                        Bestseller
                                    </span>
                                )}
                                <div className="mt-4">
                                    {/* Link to the single product details page */}
                                    <Link
                                        to={`/product/${product._id}`}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-lg">No products available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;