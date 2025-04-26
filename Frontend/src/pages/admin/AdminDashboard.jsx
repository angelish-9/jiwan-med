import { useEffect, useState } from 'react';
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [emergencyOrders, setEmergencyOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the server
    const fetchEmergencyOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/order/emergency-orders');
        const data = await response.json();
        setEmergencyOrders(data);
      } catch (error) {
        console.error('Error fetching emergency orders:', error);
        toast.error('Failed to load emergency orders.');
      }
    };

    fetchEmergencyOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/order/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Order status updated!');
        // Update the local emergencyOrders state
        setEmergencyOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error(result.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Something went wrong.');
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

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">📦 Admin - Emergency Orders</h2>

          {/* Emergency Orders Table */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3">Emergency Orders (Pending & Shipped)</h3>
            {emergencyOrders.length === 0 ? (
              <p className="text-gray-500 text-center mt-12">No emergency orders found.</p>
            ) : (
              <div className="space-y-6">
                {emergencyOrders.map((order, idx) => (
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
      </div>
    </>
  );
};

export default AdminDashboard;
