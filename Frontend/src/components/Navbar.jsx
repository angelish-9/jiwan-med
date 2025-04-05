"use client";
import { Link } from "react-router-dom";

const userRole = localStorage.getItem('role');
const Navbar = () => {
  return (
    <header className="w-full">
      {/* Top Banner */}
      <div className="flex relative flex-col justify-center items-center px-16 py-3.5 w-full text-xl min-h-[50px] max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a120f4a52efb024d8812b9e03b2c11255eb770e5b72de8ab79d0d9eb0d15bad0?placeholderIfAbsent=true&apiKey=c6bff8acd2854098b340ca41cbd4cebb"
          className="object-cover absolute inset-0 size-full"
          alt="Background banner"
        />
        <div className="flex relative flex-wrap gap-2.5 max-w-full w-[861px]">
          <p className="flex-auto font-semibold text-black w-[771px] max-md:max-w-full">
            Limited Period Offer: Get up to 10% off + extra 15% off on medicines & more offers.
          </p>
          <a href="#explore" className="font-medium text-black hover:underline">
            Explore
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-wrap gap-5 justify-between items-center py-2 pr-16 pl-1.5 w-full bg-black bg-opacity-0 max-md:pr-5 max-md:max-w-full">
        <h1 className="text-3xl font-semibold leading-none text-black">Jiwan Medico</h1>

        <a href="/medicines" className="text-lg font-semibold text-black hover:underline">
          MEDICINES
        </a>
        <a href="/consult-pharmacists" className="text-lg font-semibold text-black hover:underline">
          CONSULT PHARMACISTS
        </a>
        <a href="/doctor-appointment" className="text-lg font-semibold text-black hover:underline">
          DOCTOR APPOINTMENT
        </a>
        <a href="/lab-tests" className="text-lg font-semibold text-black hover:underline">
          LAB TESTS
        </a>

        <div className="flex gap-2.5 text-lg font-semibold text-black">
          <a href="/signin" className="hover:underline">Login</a>
          <span>|</span>
          <a href="/signup" className="hover:underline">Sign Up</a>
        </div>

        <a href="/offers" className="text-lg font-semibold hover:underline">
          Offers
        </a>
        <a href="/help" className="text-lg hover:underline">
          Need Help?
        </a>

        {userRole === 'admin' && (
          <>

          <a href="/admin">Admin Dashboard</a>
          
          </>

        )}
      
      </nav>

      {/* Sub Navigation */}
      <div className="flex flex-wrap gap-5 justify-between items-start mt-3 w-full font-semibold max-md:max-w-full">
        <nav className="flex gap-10 items-center text-2xl text-black max-md:max-w-full">
          <a href="/location" className="text-lg hover:underline">Damak, Jhapa</a>
          <a href="/" className="hover:underline">HOME</a>
          <a href="#about" className="hover:underline">ABOUT US</a>
          <a href="#faq" className="hover:underline">FAQ</a>
          <a href="#contact" className="hover:underline">CONTACT US</a>
        </nav>
        <button className="px-4 py-2 text-xl text-black bg-red-400 rounded-3xl border border-black hover:bg-red-500">
          Emergency Delivery
        </button>
      </div>

      {/* Category Navigation */}
      <nav className="flex flex-wrap gap-5 justify-between items-center px-20 py-2.5 mt-4 w-full text-lg font-semibold text-black border border-black bg-black bg-opacity-0 max-md:px-5 max-md:max-w-full">
        <Link to="/category/pain.jsx" className="hover:text-gray-700">Pain & Illness Relief</Link>
        <Link to="/category/wellness" className="hover:text-gray-700">Wellness & Fitness</Link>
        <Link to="/category/vitamin" className="hover:text-gray-700">Vitamins & Nutrition</Link>
        <a href="/category/pain.jsx" className="hover:text-gray-700">First Aid</a>
        <a href="/category/devices" className="hover:text-gray-700">Devices</a>
        <a href="/category/stomach-care" className="hover:text-gray-700">Stomach Care</a>
        <a href="/category/family-care" className="hover:text-gray-700">Family Care</a>
      </nav>


    </header>
  );
};

export default Navbar;
