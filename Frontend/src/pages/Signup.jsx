"use client";
import  { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Signup Successful! Please Sign In.");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };
  

  const handleSignInClick = () => {
    console.log("Navigate to sign in");
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
        {/* Left Section: Image */}
        <div className="w-1/2 bg-blue-100 flex items-center justify-center p-6 max-md:hidden">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/631333611ea9cd658a4535b67c77d5e6de1c39ba2d85e9f8ae3c1490ba3698c0?placeholderIfAbsent=true&apiKey=c6bff8acd2854098b340ca41cbd4cebb"
            alt="Medical illustration"
            className="object-cover rounded-lg shadow-md w-80 h-80"
          />
        </div>

        {/* Right Section: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-semibold text-gray-800 text-center">
            Welcome To Jiwan Medico
          </h1>
          <p className="text-center mt-2 text-gray-600">
            Already have an account?{" "}
            <button
              onClick={handleSignInClick}
              className="text-blue-600 underline hover:text-blue-800"
            >
              Sign in
            </button>
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 text-lg text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;