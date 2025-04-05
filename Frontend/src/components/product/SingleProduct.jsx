import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // To fetch the productId from the URL (for routing)

const SingleProduct = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Getting the productId from the URL using React Router
    const { productId } = useParams();
    const navigate = useNavigate();  // To navigate programmatically after product is deleted

    console.log(productId);  // Log the productId to the console for debugging

    // Fetch the single product details based on productId
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products/single/${productId}`);  // Make GET request to backend

            if (response.data.success) {
                setProduct(response.data.product);  // Set the product data in state
            } else {
                setError('Product not found');  // Handle case where product doesn't exist
            }
        } catch (err) {
            setError('Error fetching product data');  // Handle network or server errors
            console.error(err);
        } finally {
            setLoading(false);  // Set loading to false when the request is done
        }
    };

    useEffect(() => {
        fetchProduct();  // Call fetchProduct when the component mounts or when productId changes
    }, [productId]);  // Trigger fetch again if productId changes

    if (loading) {
        return <div>Loading...</div>;  // Show loading text while fetching data
    }

    if (error) {
        return <div>{error}</div>;  // Show error message if fetching failed
    }

    const userRole = localStorage.getItem('role');
    const token = localStorage.getItem('token');  // Get token from localStorage

    // Function to handle product removal
    const removeProduct = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/products/remove',
                { id: productId },
                {
                    headers: {
                        'Content-Type': 'application/json', // Updated content type for JSON data
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    }
                }
            );

            if (response.data.success) {
                alert('Product removed successfully');
                navigate('/list-product'); 
            } else {
                alert('Error removing product');
            }
        } catch (err) {
            console.error(err);
            alert('Error removing product');
        }
    };

    return (
        <div className="container mx-auto p-4">
            {userRole === 'admin' && (
                <>
                    <p>
                        <Link to={`/product/edit/${productId}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                            Edit
                        </Link>
                    </p>

                    <p>
                        <button
                            onClick={removeProduct}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Remove Product
                        </button>
                    </p>
                </>
            )}

            <div className="product-details mt-6">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                {product.bestseller && (
                    <span className="text-xs text-white bg-green-500 px-2 py-1 rounded-full">Bestseller</span>
                )}
            </div>
        </div>
    );
};

export default SingleProduct;
