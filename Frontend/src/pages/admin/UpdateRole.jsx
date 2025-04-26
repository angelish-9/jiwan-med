import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import { toast } from 'react-toastify';
import { FaUserEdit, FaUserShield } from 'react-icons/fa';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

const UpdateRole = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [doctorPosition, setDoctorPosition] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/all', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setUsers(res.data.users))
      .catch(err => {
        console.error('Error fetching users:', err);
        toast.error('Failed to load users');
      });
  }, [token]);

  const handleUpdateRole = async () => {
    if (!selectedUser || !newRole) {
      return toast.warning('Select a user and role');
    }

    if (newRole === 'doctor' && !doctorPosition.trim()) {
      return toast.warning('Please provide a position for the doctor');
    }

    try {
      const payload = { role: newRole };
      if (newRole === 'doctor') {
        payload.position = doctorPosition;
      }

      const res = await axios.patch(
        `http://localhost:5000/api/user/update-role/${selectedUser}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      const updatedUsers = await axios.get('http://localhost:5000/api/user/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(updatedUsers.data.users);
      setSelectedUser('');
      setSelectedUserInfo(null);
      setNewRole('');
      setDoctorPosition('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update role');
    }
  };

  const getInitials = (name) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "U";
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-tr from-blue-50 to-red-100">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-red-700 flex items-center gap-2">
                <FaUserEdit className="text-red-600" />
                Manage User Roles
              </h2>
              <MdOutlineAdminPanelSettings className="text-4xl text-red-400" />
            </div>

            {/* Select User */}
            <div className="mb-5">
              <label className="block font-medium mb-2 text-gray-700">👤 Select User</label>
              <select
                value={selectedUser}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedUser(id);
                  const user = users.find(u => u._id === id);
                  setSelectedUserInfo(user);
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              >
                <option value="">-- Choose a User --</option>
                {users
                  .filter(user => user.role !== 'admin')
                  .map(user => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
              </select>
            </div>

            {/* Display selected user info */}
            {selectedUserInfo && (
              <div className="flex items-center gap-4 bg-red-50 border border-red-200 p-4 rounded-lg mb-6 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-red-200 text-white flex items-center justify-center text-lg font-bold">
                  {getInitials(selectedUserInfo.name)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600"><strong>Name:</strong> {selectedUserInfo.name}</p>
                  <p className="text-sm text-gray-600"><strong>Email:</strong> {selectedUserInfo.email}</p>
                  <p className="text-sm text-gray-600">
                    <strong>Current Role:</strong>
                    <span className="ml-2 font-semibold text-red-600">{selectedUserInfo.role}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Select Role */}
            <div className="mb-5">
              <label className="block font-medium mb-2 text-gray-700">🛠️ New Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              >
                <option value="">-- Select Role --</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="pharmacist">Pharmacist</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            {/* Doctor Position (Conditional) */}
            {newRole === "doctor" && (
              <div className="mb-5">
                <label className="block font-medium mb-2 text-gray-700">🏥 Doctor Position</label>
                <input
                  type="text"
                  placeholder="e.g., Cardiologist, Dermatologist"
                  value={doctorPosition}
                  onChange={(e) => setDoctorPosition(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                />
              </div>
            )}

            {/* Submit button */}
            <button
              onClick={handleUpdateRole}
              className="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
            >
              <FaUserShield className="inline-block mr-2 mb-1" />
              Update Role
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateRole;
