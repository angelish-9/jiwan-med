import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        subCategory: '',
        price: '',
        bestseller: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData,
            bestseller: e.target.checked
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData object
        const productData = new FormData();
        productData.append('name', formData.name);
        productData.append('description', formData.description);
        productData.append('category', formData.category);
        productData.append('subCategory', formData.subCategory);
        productData.append('price', formData.price);
        productData.append('bestseller', formData.bestseller);

        console.log([...productData]); // Debugging: Check form data before sending

        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(
                'http://localhost:5000/api/products/add',
                productData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );

            if (response.data.success) {
                alert('Product added successfully!');
                setFormData({
                    name: '',
                    description: '',
                    category: '',
                    subCategory: '',
                    price: '',
                    bestseller: false
                });
            } else {
                alert(response.data.message || 'Error adding product');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Product Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                {/* Sub-category */}
                <div className="mb-4">
                    <label htmlFor="subCategory" className="block text-sm font-medium">Sub-category</label>
                    <input
                        type="text"
                        id="subCategory"
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded-md"
                        required
                    />
                </div>

                {/* Bestseller Checkbox */}
                <div className="mb-4">
                    <label className="block text-sm font-medium">Bestseller</label>
                    <input
                        type="checkbox"
                        checked={formData.bestseller}
                        onChange={handleCheckboxChange}
                        className="mt-1"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
