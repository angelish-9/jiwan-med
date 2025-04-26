import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from './../components/Navbar';
import { FiSettings, FiEdit2, FiMail, FiUser } from 'react-icons/fi';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/user/current', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                setUser(response.data.user);
                console.log("User Data:", user);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch user data.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full border-8 border-blue-300 border-t-blue-600 h-16 w-16"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-red-600 text-lg">{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-gray-500 text-lg">No user data found.</p>
            </div>
        );
    }

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <UserNavbar />
            </nav>

            <div className="max-w-4xl mt-28 mx-auto p-6">
                <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-8 rounded-2xl shadow-xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Profile Image */}
                        <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-blue-300">
                        <img
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username.charAt(0).toUpperCase()}`}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />

                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 space-y-3">
                            <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
                                <FiUser /> {user.username}
                            </h2>
                            <p className="text-gray-700 text-lg flex items-center gap-2">
                                <FiMail /> {user.email}
                            </p>
                            <p className="text-sm text-gray-500">
                                Member since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </p>

                            <div className="mt-4">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 transition">
                                    <FiEdit2 /> Edit Profile
                                </button>
                            </div>
                        </div>

                        {/* Settings Card */}
                        <div className="bg-white p-4 rounded-xl shadow-md w-full md:w-1/3 mt-6 md:mt-0">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
                                <FiSettings /> Settings
                            </h3>
                            <ul className="text-sm text-left text-gray-600 space-y-2">
                                <li>🔒 Change Password</li>
                                <li>🌐 Language Preferences =<strong>English</strong></li>
                                <li><a href="/myorders">📄 View Order History</a></li>
                                <li>🚪 Logout (soon)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
