
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection'; // Make sure the correct path is used for importing
import FeaturesSection from "../components/FeaturesSection";
import ProductList from "../components/ProductList";
import CounterSection from "../components/CounterSection";
import BusinessCards from "../components/BusinessCards";
import TestimonialSection from "../components/TestimonialSection";
import RatingComponent from "../components/RatingComponent";
import Footer from "../components/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/bestsellers");
        setBestsellers(response.data.products); // Assuming it returns { products: [...] }
      } catch (error) {
        console.error("Error fetching bestsellers", error);
      }
    };

    fetchBestsellers();
  }, []);
  return (
    <div className='flex-col items-center justify-center min-h-screen w  bg-white'>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        {/* Navigation content here */}
      <Navbar />
      </nav>
      {/* Hero Section Below Navbar */}
      <div className="mt-28">
        <HeroSection />
      </div>

      <div className='-mt-16'>
        <FeaturesSection />
      </div>

      <section className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-600">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestsellers.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </section>


      {/* popular products */}
      <div>
        <h1 className="text-center mt-12 text-4xl font-bold py-2">Popular Products</h1>
        <ProductList />
      </div>

      {/* counter */}
      <div className='mt-12'>
        <CounterSection />
      </div>

      {/* Explore */}
      <div>
        <h1 className="text-center mt-16 text-4xl font-bold py-6">Explore Something New on our Store</h1>
        <ProductList />
      </div>


      {/* Best Doc 
      a
      a
      a
      a*/}


      {/* BusinessCard */}
      <div>
        <BusinessCards />
      </div>


      {/* pathology test 
      a
      a
      a
      a*/}


      {/* testimonial */}
      <div>
        <TestimonialSection />
      </div>

      {/* ratings */}
      <div className="flex flex-col items-center gap-10 p-6">
        <h1 className="text-center text-4xl font-bold py-6">How Useful Was This Website!</h1>
        <RatingComponent /> {/* Add Rating Component Below BusinessCards */}
      </div>

      {/* footer */}
      <div>
        <Footer /> 
      </div>
    </div>
  );
};

export default Home;