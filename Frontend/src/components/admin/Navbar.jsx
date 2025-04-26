import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className='flex justify-between py-2 items-center px-[4%] bg-white shadow-md'>
      <h1 
        onClick={goHome}
        className='text-2xl font-bold text-black cursor-pointer hover:text-red-600 transition'
      >
        Jiwan Medico
      </h1>

      <button 
        onClick={handleLogout} 
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-base font-bold hover:bg-gray-700 transition'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
