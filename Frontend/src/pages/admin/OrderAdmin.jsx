import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import { toast } from 'react-toastify';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/order/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error('Failed to load orders:', error);
        toast.error('Error loading orders.');
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/order/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );

      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success(`Order marked as ${newStatus}`);
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update status');
    }
  };

  const renderStatusButtons = (order) => {
    if (order.status === 'Completed') {
      return <p className="italic text-gray-500 mt-2">Order is completed. No further changes allowed.</p>;
    }

    const statuses = ['Pending', 'Shipped', 'Delivered', 'Canceled', 'Completed'];

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {statuses.map(status => (
          order.status !== status && (
            <button
              key={status}
              onClick={() => handleStatusChange(order._id, status)}
              className={`px-3 py-1.5 rounded text-sm font-medium text-white transition duration-150 ${status === 'Pending' ? 'bg-yellow-500 hover:bg-yellow-600' :
                status === 'Shipped' ? 'bg-blue-500 hover:bg-blue-600' :
                  status === 'Delivered' ? 'bg-green-500 hover:bg-green-600' :
                    status === 'Canceled' ? 'bg-red-500 hover:bg-red-600' :
                      status === 'Completed' ? 'bg-gray-700 hover:bg-gray-800' : ''
                }`}
            >
              Mark as {status}
            </button>
          )
        ))}
      </div>
    );
  };

  const getStatusBadge = (status) => {
    const badgeStyles = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Shipped: 'bg-blue-100 text-blue-800',
      Delivered: 'bg-green-100 text-green-800',
      Canceled: 'bg-red-100 text-red-800',
      Completed: 'bg-gray-200 text-gray-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badgeStyles[status] || 'bg-gray-100 text-gray-700'}`}>
        {status}
      </span>
    );
  };

  const statusFilters = ["All", "Pending", "Shipped", "Delivered", "Canceled", "Completed"];
  const filteredOrders = filter === "All" ? orders : orders.filter(order => order.status === filter);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">📦 Admin - All Orders</h2>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {statusFilters.map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${filter === status
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-red-100'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>

          {filteredOrders.length === 0 ? (
            <p className="text-gray-500 text-center mt-12">No orders found for <strong>{filter}</strong> status.</p>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order, idx) => (
                <div key={order._id} className="bg-white p-5 rounded-lg border shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center">
                      <h3 className="text-lg font-semibold">Order #{idx + 1}</h3>
                      {order.deliveryOption === 'emergency' && (
                        <span className="ml-3 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">🚨 Emergency Delivery</span>
                      )}
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                    <p><strong>Customer:</strong> {order.user?.name || order.user?.email || 'N/A'}</p>
                    <p><strong>Phone:</strong> {order.phone || 'N/A'}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                    <p><strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    <strong>Items:</strong>
                    <ul className="list-disc list-inside">
                      {order.items.map((item, i) => (
                        <li key={i}>
                          {item.productId?.name || 'Deleted Product'} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {renderStatusButtons(order)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminOrdersPage;
