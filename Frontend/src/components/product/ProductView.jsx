import React from "react";

const ProductView = ({ product }) => {
  const {
    image,
    name,
    description,
    rating,
    reviews,
    price,
    stock,
  } = product;

  return (
    
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Product Image */}
        <div>
          <img
            src={image}
            alt={name}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div>
          <h2 className="text-3xl font-bold mb-2">{name}</h2>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400 text-xl">
              {Array.from({ length: rating }, (_, i) => (
                <span key={i}>★</span>
              ))}
              {Array.from({ length: 5 - rating }, (_, i) => (
                <span key={i} className="text-gray-300">★</span>
              ))}
            </div>
            <p className="text-sm text-gray-600">({reviews} reviews)</p>
          </div>

          <p className="text-gray-700 mb-4">{description || "No description provided."}</p>

          <p className="text-2xl font-semibold text-green-600 mb-2">₹{price.toFixed(2)}</p>
          <p className="text-sm mb-6">
            {stock > 0 ? (
              <span className="text-green-500">In Stock ({stock})</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              disabled={stock === 0}
            >
              Add to Cart
            </button>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              disabled={stock === 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductView;
