import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./../../components/admin/Sidebar";
import Navbar from "./../../components/admin/Navbar";

const UpdateRole = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [newRole, setNewRole] = useState('');

  // Fetch all users
  useEffect(() => {
    axios.get('http://localhost:5000/api/user/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        setUsers(res.data.users);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [token]);

  // Handle role update
  const handleUpdateRole = async () => {
    if (!selectedUser || !newRole) return alert('Please select a user and role.');

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/user/update-role/${selectedUser}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
      // Refresh user list
      const updatedUsers = await axios.get('http://localhost:5000/api/user/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(updatedUsers.data.users);
      setSelectedUser('');
      setSelectedUserInfo(null);
      setNewRole('');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update role');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">🔧 Update User Role</h2>

            {/* Select user */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Select User</label>
              <select
                value={selectedUser}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedUser(id);
                  const user = users.find(u => u._id === id);
                  setSelectedUserInfo(user);
                }}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select User --</option>
                {users
                  .filter(user => user.role !== 'admin') // exclude admins
                  .map(user => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
              </select>
            </div>

            {/* Display selected user info */}
            {selectedUserInfo && (
              <div className="bg-gray-50 p-4 border rounded mb-4">
                <p><strong>Name:</strong> {selectedUserInfo.name}</p>
                <p><strong>Email:</strong> {selectedUserInfo.email}</p>
                <p><strong>Current Role:</strong> 
                  <span className="ml-2 font-semibold text-indigo-600">{selectedUserInfo.role}</span>
                </p>
              </div>
            )}

            {/* Select new role */}
            <div className="mb-4">
              <label className="block font-medium mb-1">New Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Select Role --</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="pharmacist">Pharmacist</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            {/* Submit button */}
            <button
              onClick={handleUpdateRole}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded shadow-md transition"
            >
              Update Role
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateRole;
