import React from "react";
import ProductView from "../components/product/ProductView.jsx";

import productImage from "../assets/product1.jpeg"; // Replace with actual path

const sampleProduct = {
  image: productImage,
  name: "Vitamin B Complex",
  rating: 5,
  reviews: 120,
  price: 99.99,
  stock: 15,
  description:
    "This Vitamin B Complex helps support energy production and promotes overall wellness.",
};

const ProductPage = () => {
  return (
    <div>
      <ProductView product={sampleProduct} />
    </div>
  );
};

export default ProductPage;
