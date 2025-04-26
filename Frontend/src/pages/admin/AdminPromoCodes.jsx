import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import Navbar from './../../components/admin/Navbar';
import Sidebar from "./../../components/admin/Sidebar";

const AdminPromoCodes = () => {
    const [promoCodes, setPromoCodes] = useState([]);
    const [form, setForm] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        usageLimit: '',
        expiresAt: '',
    });
    const [editingId, setEditingId] = useState(null);
    const [errors, setErrors] = useState({});

    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const fetchPromos = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/promocode", config);
            setPromoCodes(res.data);
        } catch (err) {
            console.error("Failed to fetch promo codes", err);
        }
    };

    useEffect(() => {
        fetchPromos();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.code.trim()) newErrors.code = 'Code is required.';
        if (!form.discountValue || form.discountValue <= 0) newErrors.discountValue = 'Discount must be a positive number.';
        if (form.usageLimit && form.usageLimit < 0) newErrors.usageLimit = 'Usage limit cannot be negative.';
        if (form.expiresAt && new Date(form.expiresAt) < new Date().setHours(0, 0, 0, 0)) {
            newErrors.expiresAt = 'Cannot select a past date.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/promocode/${editingId}`, form, config);
            } else {
                await axios.post("http://localhost:5000/api/promocode", form, config);
            }

            setForm({
                code: '',
                discountType: 'percentage',
                discountValue: '',
                usageLimit: '',
                expiresAt: '',
            });
            setEditingId(null);
            fetchPromos();
        } catch (err) {
            console.error("Submit error", err);
        }
    };

    const handleEdit = (promo) => {
        setEditingId(promo._id);
        setForm({
            code: promo.code,
            discountType: promo.discountType,
            discountValue: promo.discountValue,
            usageLimit: promo.usageLimit || '',
            expiresAt: promo.expiresAt ? promo.expiresAt.slice(0, 10) : '',
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this promo code?")) {
            try {
                await axios.delete(`http://localhost:5000/api/promocode/${id}`, config);
                fetchPromos();
            } catch (err) {
                console.error("Delete error", err);
            }
        }
    };

    const todayDate = new Date().toISOString().split("T")[0];

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-grow p-6">
                    <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-3xl font-bold text-red-600 mb-6">{editingId ? "Edit" : "Create"} Promo Code</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 text-left gap-6 mb-6">
                            <div>
                                <label className="block font-medium mb-1">Code</label>
                                <input
                                    name="code"
                                    placeholder="Enter promo code"
                                    value={form.code}
                                    onChange={handleChange}
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.code && <p className="text-red-600 text-sm mt-1">{errors.code}</p>}
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Discount Type</label>
                                <select
                                    name="discountType"
                                    value={form.discountType}
                                    onChange={handleChange}
                                    className="p-2 border border-gray-300 rounded w-full"
                                >
                                    <option value="percentage">Percentage</option>
                                    <option value="flat">Flat</option>
                                </select>
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Discount Value</label>
                                <input
                                    name="discountValue"
                                    placeholder="Discount Value"
                                    value={form.discountValue}
                                    onChange={handleChange}
                                    type="number"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.discountValue && <p className="text-red-600 text-sm mt-1">{errors.discountValue}</p>}
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Usage Limit</label>
                                <input
                                    name="usageLimit"
                                    placeholder="Usage Limit"
                                    value={form.usageLimit}
                                    onChange={handleChange}
                                    type="number"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.usageLimit && <p className="text-red-600 text-sm mt-1">{errors.usageLimit}</p>}
                            </div>

                            <div>
                                <label className="block font-medium mb-1">Expiry Date</label>
                                <input
                                    name="expiresAt"
                                    type="date"
                                    value={form.expiresAt}
                                    onChange={handleChange}
                                    min={todayDate}
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                                {errors.expiresAt && <p className="text-red-600 text-sm mt-1">{errors.expiresAt}</p>}
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                        >
                            {editingId ? "Update Promo Code" : "Create Promo Code"}
                        </button>

                        <hr className="my-10" />

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Promo Codes</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm bg-white border rounded-lg shadow">
                                <thead>
                                    <tr className="bg-red-100  text-gray-700">
                                        <th className="p-3 border">Code</th>
                                        <th className="p-3 border">Type</th>
                                        <th className="p-3 border">Value</th>
                                        <th className="p-3 border">Used / Limit</th>
                                        <th className="p-3 border">Expires</th>
                                        <th className="p-3 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {promoCodes.map((promo) => (
                                        <tr key={promo._id} className="hover:bg-gray-50">
                                            <td className="p-3 border">{promo.code}</td>
                                            <td className="p-3 border capitalize">{promo.discountType}</td>
                                            <td className="p-3 border">{promo.discountValue}</td>
                                            <td className="p-3 border">{promo.usedCount}/{promo.usageLimit || '∞'}</td>
                                            <td className="p-3 border">{promo.expiresAt ? promo.expiresAt.slice(0, 10) : 'Never'}</td>
                                            <td className="p-3 border flex space-x-4">
                                                <button
                                                    onClick={() => handleEdit(promo)}
                                                    title="Edit"
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(promo._id)}
                                                    title="Delete"
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPromoCodes;
