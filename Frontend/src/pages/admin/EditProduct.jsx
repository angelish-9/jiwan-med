import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from './../../components/admin/Sidebar';
import AdminNavbar from './../../components/admin/Navbar';

const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        bestseller: false,
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/single/${productId}`);
                if (response.data.success) {
                    setProduct(response.data.product);
                    setForm({
                        name: response.data.product.name,
                        description: response.data.product.description,
                        price: response.data.product.price,
                        bestseller: response.data.product.bestseller,
                    });
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                setError('Failed to fetch product');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/products/admin/update/${productId}`, form, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                alert('Product updated successfully!');
                navigate(`/product/${productId}`);
            } else {
                alert('Update failed');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong while updating.');
        }
    };

    if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

    const userRole = localStorage.getItem('role');
    if (userRole !== 'admin') {
        return <div className="text-center text-red-600 mt-10">Unauthorized Access</div>;
    }

    return (
        <>
            <AdminNavbar />
            <div className="flex min-h-screen">
                <AdminSidebar />
                <div className="flex-1 p-10 bg-gray-100">
                    <h1 className="text-3xl font-bold mb-6 text-gray-700">Edit Product</h1>
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md max-w-2xl">
                        <div>
                            <label className="block text-gray-700 font-semibold">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full mt-2 p-3 border rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold">Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full mt-2 p-3 border rounded-lg"
                                rows="4"
                                required
                            />
                        </div>

        <div>
            <label className="block text-gray-700 font-semibold">Price ($)</label>
            <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full mt-2 p-3 border rounded-lg"
                required
                step="0.01"
            />
        </div>

        <div className="flex items-center">
            <input
                type="checkbox"
                name="bestseller"
                checked={form.bestseller}
                onChange={handleChange}
                className="mr-2"
            />
            <label className="text-gray-700 font-semibold">Mark as Bestseller</label>
        </div>

        <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
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
