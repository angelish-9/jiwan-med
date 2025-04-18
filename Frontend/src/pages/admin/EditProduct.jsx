import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from './../../components/admin/Navbar';
import AdminSidebar from './../../components/admin/Sidebar';

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [bestseller, setBestseller] = useState(false);
    const [imageFile, setImageFile] = useState(null);

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/products/single/${productId}`);
            if (res.data.success) {
                const data = res.data.product;
                setProduct(data);
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setBestseller(data.bestseller || false);
            }
        } catch (err) {
            console.error('Error fetching product:', err);
            alert('Error fetching product details');
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('bestseller', bestseller);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const response = await axios.put(
                `http://localhost:5000/api/products/admin/update/${productId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (response.data.success) {
                alert('Product updated successfully!');
                navigate('/list-product');
            } else {
                alert('Failed to update product');
            }
        } catch (err) {
            console.error('Error updating product:', err);
            alert('Error updating product');
        }
    };

    return (
        <>
            <AdminNavbar />
            <div className="flex min-h-screen bg-gray-100">
                <AdminSidebar />
                <div className="flex-1 p-8">
                    <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Product Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="w-full border p-2 rounded"
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={bestseller}
                                    onChange={(e) => setBestseller(e.target.checked)}
                                    className="mr-2"
                                />
                                Bestseller
                            </label>
                        </div>

                        <div className="mb-4">
                            <label className="block font-semibold mb-1">Update Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="w-full"
                            />
                        </div>

                        {product?.image && product.image.length > 0 && (
                            <div className="mb-4">
                                <label className="block font-semibold mb-1">Current Images:</label>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    {product.image.map((img, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:5000${img}`}
                                            alt={`Product ${index + 1}`}
                                            className="w-full h-32 object-cover rounded"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                        >
                            Update Product
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditProduct;
