import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './../../components/admin/Navbar';

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/order/all', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            setOrders(res.data.orders || []);
        }).catch(err => {
            console.error('Failed to load orders:', err);
        });
    }, []);

    // Function to handle status change
    const handleStatusChange = (orderId, newStatus) => {
        axios.put(`http://localhost:5000/api/order/${orderId}/status`, {
            status: newStatus
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            setOrders(orders.map(order => 
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
        }).catch(err => {
            console.error('Failed to update order status:', err);
        });
    };

    return (
        <>
            <AdminNavbar />
            <div className="max-w-6xl mx-auto p-6">
                <h2 className="text-3xl font-bold mb-6">All Orders</h2>

                {orders.length === 0 ? (
                    <p className="text-gray-500">No orders found.</p>
                ) : (
                    orders.map((order, idx) => (
                        <div key={order._id} className="border p-5 rounded mb-6 shadow-sm bg-white">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-lg">Order #{idx + 1}</h3>
                                <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                    {order.status}
                                </span>
                            </div>
                            <p><strong>Customer:</strong> {order.user?.name || order.user?.email || 'N/A'}</p>
                            <p><strong>Phone:</strong> {order.phone}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                            <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                            <ul className="mt-3 list-disc list-inside">
                                {order.items.map((item, i) => (
                                    <li key={i}>{item.productId?.name || 'Deleted Product'} × {item.quantity}</li>
                                ))}
                            </ul>

                            <div className="mt-3 flex justify-end">
                                {/* Conditionally render buttons based on order status */}
                                {order.status !== 'Shipped' && (
                                    <button
                                        onClick={() => handleStatusChange(order._id, 'Shipped')}
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Mark as Shipped
                                    </button>
                                )}
                                {order.status !== 'Delivered' && (
                                    <button
                                        onClick={() => handleStatusChange(order._id, 'Delivered')}
                                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Mark as Delivered
                                    </button>
                                )}
                                {order.status !== 'Pending' && (
                                    <button
                                        onClick={() => handleStatusChange(order._id, 'Pending')}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Mark as Pending
                                    </button>
                                )}
                                {order.status !== 'Canceled' && (
                                    <button
                                        onClick={() => handleStatusChange(order._id, 'Canceled')}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Mark as Canceled
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default AdminOrdersPage;
