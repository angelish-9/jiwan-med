import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faBox, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const categories = [
    "Allergy_&_Cold",
    "Ayurveda",
    "Chronic_Care",
    "First_Aid",
    "Health_Devices",
    "Mother_&_Baby",
    "Pain_&_Illness_Relief",
    "Personal_Care",
    "Sexual_Wellness",
    "Vitamins_and_Nutrition",


  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

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
          <h1 className="text-xl font-bold text-black"><a href="/">Jiwan Medico</a></h1>
        </div>

        {/* Center: Main Nav Links */}
        <div className="flex flex-wrap gap-6 items-center text-lg font-semibold text-black max-md:mt-4">
          <a href="/medicines" className="hover:underline">MEDICINES</a>
          {userRole === "pharmacist" ? (
            <a href="/pharmacist-inbox" className="hover:underline">Pharmacist Inbox</a>
          ) : (
            <a href="/consult-pharmacists" className="hover:underline">Consult Pharmacists</a>
          )}
          <a href="/appointment" className="hover:underline">DOCTOR APPOINTMENT</a>

          <a href="/faq" className="hover:underline">Need Help?</a>
          {userRole === "admin" && (
            <a href="/admin/dashboard" className="text-indigo-600 hover:underline">Admin Dashboard</a>
          )}


          {userRole === "doctor" && (
            <a href="/doctor-dashboard" className="text-indigo-600 hover:underline">Doctor Dashboard</a>
          )}


        </div>

        {/* Right: Auth/Profile */}
        <div className="flex gap-4 items-center text-lg font-semibold text-black relative max-md:mt-4">

          {token && userRole ? (
            <>
              <Link to="/cart" className="hover:text-red-600" title="Cart">
                <FontAwesomeIcon icon={faCartShopping} />
              </Link>

              <Link to="/myorders" className="hover:text-red-600" title="My Orders">
                <FontAwesomeIcon icon={faBox} />
              </Link>

              {/* Profile Hover Menu */}
              <div className="relative group">
                <FontAwesomeIcon icon={faUser} className="cursor-pointer group-hover:text-red-600" />

                <div className="absolute hidden group-hover:flex flex-col bg-white border shadow-lg rounded py-2 px-4 top-7 right-0 z-20 min-w-[120px] text-sm">
                  <Link to="/profile" className="hover:text-red-600 mb-1">View Profile</Link>
                  <button onClick={handleLogout} className="text-red-600 hover:underline text-left">
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="relative group">
              <FontAwesomeIcon icon={faUser} className="cursor-pointer group-hover:text-red-600" />

              <div className="absolute hidden group-hover:flex flex-col bg-white border shadow-lg rounded py-2 px-4 top-8 right-0 z-20 min-w-[120px] text-sm">
                <Link to="/signin" className="hover:text-red-600 mb-1">Sign In</Link>
                <Link to="/signup" className="hover:text-red-600">Sign Up</Link>
              </div>
            </div>
          )}
        </div>

      </nav>


      {/* Category Navigation */}
      <div className="w-full flex justify-center gap-8 py-4 text-base text-black bg-gray-100">
        {categories.map((cat) => (
          <Link
            key={cat.toLowerCase()}
            to={`/product/category/${cat.toLowerCase()}`}
            className="hover:text-red-600 capitalize"
          >
            {cat.replaceAll("_", " ")}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
