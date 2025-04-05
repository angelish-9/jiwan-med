"use client";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        alert("Login Successful!");

        // ✅ Redirect based on role
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }

      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };


  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/3 hidden md:flex items-center justify-center bg-blue-100 p-6">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d460e1aa01c1dac709bf66b780e90471caa4f2024fa380a04084e948316301bb?placeholderIfAbsent=true&apiKey=c6bff8acd2854098b340ca41cbd4cebb"
            alt="Jiwan Medico Welcome"
            className="w-56 h-56 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-2/3 p-8 md:p-16 bg-white">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Welcome to Jiwan Medico
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Are you a new user?{" "}
            <a href="/signup" className="text-blue-600 underline">
              Create a New Account
            </a>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="username" className="block text-gray-700 font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-red-500 text-white py-3 rounded-lg text-xl font-semibold hover:bg-red-600 transition duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignIn;