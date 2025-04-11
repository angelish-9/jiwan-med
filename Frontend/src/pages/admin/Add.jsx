import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "./../../components/admin/Sidebar";
import Navbar from "./../../components/admin/Navbar";

const Add = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [role, navigate]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    bestseller: false,
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("bestseller", product.bestseller);
      if (product.image) {
        formData.append("image", product.image);
      }

      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:5000/api/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        bestseller: false,
        image: null,
      });
    } catch (error) {
      console.error(error);
      setMessage("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
          {message && <p className="mb-4 text-green-600">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              onChange={handleChange}
              value={product.name}
              required
              className="w-full p-3 border rounded"
            />

            <textarea
              name="description"
              placeholder="Description"
              onChange={handleChange}
              value={product.description}
              required
              className="w-full p-3 border rounded"
            ></textarea>

            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              value={product.price}
              required
              className="w-full p-3 border rounded"
            />

            <label className="block">
              <span className="block mb-1 font-medium">Category</span>
              <select
                name="category"
                onChange={handleChange}
                value={product.category}
                required
                className="w-full p-3 border rounded"
              >
                <option value="">Select a Category</option>
                <option value="pain_and_illness_relief">Pain & Illness Relief</option>
                <option value="wellness_and_fitness">Wellness & Fitness</option>
                <option value="vitamins_and_nutrition">Vitamins and Nutrition</option>
                <option value="first_aid">First Aid</option>
                <option value="chronic_care">Chronic Care</option>
                <option value="personal_care">Personal Care</option>
              </select>
            </label>

            <label className="block">
              <span className="block mb-1 font-medium">Bestseller</span>
              <select
                name="bestseller"
                onChange={handleChange}
                value={product.bestseller}
                className="w-full p-3 border rounded"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </label>

            <input
              type="file"
              onChange={handleFileChange}
              required
              className="w-full"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;
