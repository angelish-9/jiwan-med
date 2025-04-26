import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from '../components/Navbar';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orderDetailsVisible, setOrderDetailsVisible] = useState(null);
    const [orderTrackingVisible, setOrderTrackingVisible] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/order/my', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            setOrders(res.data.orders || []);
            setFilteredOrders(res.data.orders || []);
        }).catch(err => {
            console.error('Failed to load orders:', err);
        });
    }, []);

    const handleFilterChange = (status) => {
        if (status === 'All') {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(order => order.status === status));
        }
    };

    const handleToggleDetails = (orderId) => {
        setOrderDetailsVisible(prevState => prevState === orderId ? null : orderId);
    };

    const handleToggleTracking = (orderId) => {
        setOrderTrackingVisible(prevState => prevState === orderId ? null : orderId);
    };

    return (
        <div>
            <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <UserNavbar />
            </nav>

            <div className="max-w-7xl mt-28 mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Orders</h2>

                <div className="mb-6 flex justify-center gap-4">
                    <button
                        className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200"
                        onClick={() => handleFilterChange('All')}
                    >
                        All Orders
                    </button>
                    <button
                        className="px-6 py-3 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700 transition duration-200"
                        onClick={() => handleFilterChange('Pending')}
                    >
                        Pending
                    </button>
                    <button
                        className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                        onClick={() => handleFilterChange('Shipped')}
                    >
                        Shipped
                    </button>
                    <button
                        className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition duration-200"
                        onClick={() => handleFilterChange('Delivered')}
                    >
                        Delivered
                    </button>
                    <button
                        className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-200"
                        onClick={() => handleFilterChange('Canceled')}
                    >
                        Canceled
                    </button>
                </div>

                {filteredOrders.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg mt-10">
                        No orders found for the selected filter.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredOrders.map((order, idx) => (
                            <div key={order._id} className="bg-white shadow-lg rounded-lg p-6 border hover:shadow-xl transition duration-300 ease-in-out">
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-green-600 mb-1">Order #{idx + 1}</h3>
                                    <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>

                                <div className="mb-3 space-y-2 text-sm">
                                    <p><span className="font-medium text-gray-700">Status:</span>
                                        <span className={`px-3 py-1 text-xs rounded-full ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {order.status}
                                        </span>
                                    </p>
                                    <p><span className="font-medium text-gray-700">Total:</span> ${order.total.toFixed(2)}</p>
                                </div>

                                <div className="border-t mt-4 pt-3">
                                    <button 
                                        className="w-full text-left text-blue-600"
                                        onClick={() => handleToggleDetails(order._id)}
                                    >
                                        {orderDetailsVisible === order._id ? 'Hide Details' : 'Show Details'}
                                    </button>

                                    {orderDetailsVisible === order._id && (
    <div className="mt-4 text-sm text-gray-700">
        <p className="flex items-center">
            <span className="font-medium text-gray-800 w-24">Address:</span> {order.address}
        </p>
        <p className="flex items-center">
            <span className="font-medium text-gray-800 w-24">Phone:</span> {order.phone}
        </p>
        <p className="font-medium text-left text-gray-800 mt-3">Items:</p>
        <ul className="list-disc list-inside space-y-2 ml-6">
            {order.items.map((item, index) => (
                <li key={index} className="flex items-center">
                    <span className="text-gray-700">{item.productId.name} × {item.quantity}</span>
                </li>
            ))}
        </ul>
    </div>
)}


                                    <button 
                                        className="w-full text-left text-blue-600 mt-3"
                                        onClick={() => handleToggleTracking(order._id)}
                                    >
                                        {orderTrackingVisible === order._id ? 'Hide Tracking' : 'Track Order'}
                                    </button>

                                    {orderTrackingVisible === order._id && (
                                        <div className="mt-4 text-sm text-gray-700">
                                            <p><span className="font-medium text-gray-800">Order Status:</span> {order.status}</p>
                                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                <div
                                                    className={`h-2 rounded-full ${order.status === 'Pending' ? 'bg-yellow-500' : order.status === 'Shipped' ? 'bg-blue-500' : order.status === 'Delivered' ? 'bg-green-500' : 'bg-red-500'}`}
                                                    style={{ width: order.status === 'Pending' ? '33%' : order.status === 'Shipped' ? '66%' : '100%' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;
