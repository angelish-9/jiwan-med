import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "./../../components/admin/Sidebar";
import Navbar from "./../../components/admin/Navbar";
import {
  BiSolidPackage,
  BiDetail,
  BiDollarCircle,
  BiCategoryAlt,
  BiImageAdd,
  BiRocket,
} from "react-icons/bi";

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

      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-10">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-red-700 flex items-center gap-2">
              <BiSolidPackage size={30} />
              Add New Product
            </h2>

            {message && (
              <div className="mb-4 text-center text-sm font-semibold text-green-600">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block font-medium mb-1 text-gray-700 flex items-center gap-2">
                  <BiSolidPackage /> Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={product.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-1 text-gray-700 flex items-center gap-2">
                  <BiDetail /> Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  value={product.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block font-medium mb-1 text-gray-700 flex items-center gap-2">
                  <BiDollarCircle /> Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={product.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-medium mb-1 text-gray-700 flex items-center gap-2">
                  <BiCategoryAlt /> Category
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select a Category</option>
                  <option value="allergy_&_cold">Allergy and Cold</option>
                  <option value="ayurveda">Ayurveda</option>
                  <option value="chronic_care">Chronic Care</option>
                  <option value="first_aid">First Aid</option>
                  <option value="health_devices">Health Devices</option>
                  <option value="mother_&_baby">Mother and Baby</option>
                  <option value="pain_&_illness_relief">Pain & Illness Relief</option>
                  <option value="personal_care">Personal Care</option>
                  <option value="sexual_wellness">Sexual Wellness</option>
                  <option value="vitamins_&_nutrition">Vitamins & Nutrition</option>
                </select>
              </div>

              {/* Bestseller */}
              <div>
                <label className="block font-medium mb-1 text-gray-700 flex items-center gap-2">
                  <BiRocket /> Bestseller
                </label>
                <select
                  name="bestseller"
                  value={product.bestseller}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block font-medium mb-1 text-gray-700 flex items-center gap-2">
                  <BiImageAdd /> Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 w-full"
              >
                {loading ? "Adding..." : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
