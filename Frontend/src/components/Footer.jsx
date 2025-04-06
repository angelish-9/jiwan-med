import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaDribbble, FaGoogle, FaArrowUp } from "react-icons/fa";
import logo from "../assets/logo.png"; 

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Handle Scroll to Top Button Visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Main Footer */}
      <footer className="py-10 bg-gray-900 text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-6">
          {/* Contact Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">CONTACT</h3>
            <p>Damak - 6 Nagarpalika Road</p>
            <p>JHAPA, NEPAL</p>
            <p>023-575427</p>
            <p>support@jiwanmedico.com</p>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">COMPANY</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Blog</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Contact</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Become a Pharmacists</a></li>
            </ul>
          </div>

          {/* Service Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">SERVICES</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Emergency Delivery System</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Talk with Pharmacists</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Dr. Appointment</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Lab Test</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">SUPPORT</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:underline">Documentation</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Forums</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Language Packs</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Release Status</a></li>
            </ul>
          </div>

          {/* Mobile Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">MOBILE</h3>
            <div className="space-y-4">
              <a href="#" className="block bg-gray-800 p-4 rounded-lg flex items-center space-x-3 hover:bg-gray-700">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" alt="App Store" className="w-6 h-6" />
                <span>App Store</span>
              </a>
              <a href="#" className="block bg-gray-800 p-4 rounded-lg flex items-center space-x-3 hover:bg-gray-700">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="Google Play" className="w-6 h-6" />
                <span>Google Play</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="bg-black py-4 text-gray-500 text-center flex flex-col md:flex-row justify-between items-center px-6">
        {/* Logo and Name */}
        <div className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                    <span className="text-xl font-bold text-white">Jiwan Medico</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-4 my-4 md:my-0">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Sitemap</a>
          <a href="#" className="hover:underline">Purchase</a>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white"><FaFacebookF /></a>
          <a href="#" className="hover:text-white"><FaTwitter /></a>
          <a href="#" className="hover:text-white"><FaInstagram /></a>
          <a href="#" className="hover:text-white"><FaPinterestP /></a>
          <a href="#" className="hover:text-white"><FaDribbble /></a>
          <a href="#" className="hover:text-white"><FaGoogle /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black text-center text-gray-500 py-4">
        <p>Copyright Jiwan Medico © 2025. All Rights Reserved.</p>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button onClick={scrollToTop} className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition">
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default Footer;
