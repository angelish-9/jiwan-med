import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; 

const userRole = localStorage.getItem("role");

const Navbar = () => {
  return (
    <header className="w-full">

      {/* Top Banner */}
      <div className="flex justify-center items-center bg-black px-4 py-2 text-white text-sm font-medium">
        <p className="text-center max-w-[861px]">
          Limited Period Offer: Get up to 10% off + extra 15% off on medicines & more offers.{" "}
          <a href="#explore" className="text-red-500 hover:underline">Explore!</a>
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-wrap items-center justify-between px-6 py-3 w-full bg-white shadow-md max-md:flex-col max-md:items-start">
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-2xl font-bold text-black">Jiwan Medico</h1>
        </div>

        {/* Center: Main Nav Links */}
        <div className="flex flex-wrap gap-6 items-center text-lg font-semibold text-black max-md:mt-4">
          <a href="/medicines" className="hover:underline">MEDICINES</a>
          <a href="/consult-pharmacists" className="hover:underline">CONSULT PHARMACISTS</a>
          <a href="/doctor-appointment" className="hover:underline">DOCTOR APPOINTMENT</a>
          <a href="/lab-tests" className="hover:underline">LAB TESTS</a>
          <a href="/offers" className="hover:underline">Offers</a>
          <a href="/help" className="hover:underline">Need Help?</a>
          {userRole === "admin" && (
            <a href="/admin" className="text-indigo-600 hover:underline">Admin Dashboard</a>
          )}
        </div>

        {/* Right: Auth */}
        <div className="flex gap-2.5 text-lg font-semibold text-black max-md:mt-4">
          <a href="/signin" className="hover:underline">Login</a>
          <span>|</span>
          <a href="/signup" className="hover:underline">Sign Up</a>
        </div>
      </nav>

      {/* Sub Navigation */}
      <div className="flex flex-wrap gap-5 justify-between items-center mt-3 px-6 max-md:flex-col max-md:items-start">
        <nav className="flex gap-8 text-lg font-semibold text-black">
          <a href="/location" className="hover:underline">Damak, Jhapa</a>
          <a href="/" className="hover:underline">HOME</a>
          <a href="#about" className="hover:underline">ABOUT US</a>
          <a href="/faq" className="hover:underline">FAQ</a>
          <a href="#contact" className="hover:underline">CONTACT US</a>
        </nav>
        <button className="px-4 py-2 text-lg text-white bg-red-500 rounded-3xl hover:bg-red-600 border border-black">
          Emergency Delivery
        </button>
      </div>

      {/* Category Navigation */}
      <nav className="flex flex-wrap gap-5 justify-center items-center px-6 py-2.5 mt-4 text-lg font-semibold text-black border-t border-b border-black bg-white">
        <Link to="/category/pain" className="hover:text-gray-700">Pain & Illness Relief</Link>
        <Link to="/category/wellness" className="hover:text-gray-700">Wellness & Fitness</Link>
        <Link to="/category/vitamin" className="hover:text-gray-700">Vitamins & Nutrition</Link>
        <Link to="/category/first-aid" className="hover:text-gray-700">First Aid</Link>
        <Link to="/category/devices" className="hover:text-gray-700">Devices</Link>
        <Link to="/category/stomach-care" className="hover:text-gray-700">Stomach Care</Link>
        <Link to="/category/family-care" className="hover:text-gray-700">Family Care</Link>
      </nav>

    </header>
  );
};

export default Navbar;
