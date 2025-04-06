
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection'; // Make sure the correct path is used for importing
import FeaturesSection from "../components/FeaturesSection";
import ProductList from "../components/ProductList";
import CounterSection from "../components/CounterSection";
import BusinessCards from "../components/BusinessCards";
import TestimonialSection from "../components/TestimonialSection";
import RatingComponent from "../components/RatingComponent";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div className='flex-col items-center justify-center min-h-screen w  bg-white'>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        {/* Navigation content here */}
      <Navbar />
      </nav>
      {/* Hero Section Below Navbar */}
      <div className="mt-48">
        <HeroSection />
      </div>
      <div className='-mt-16'>
        <FeaturesSection />
      </div>

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