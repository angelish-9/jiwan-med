import { NavLink } from 'react-router-dom';
import { BiPlusCircle } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { MdList } from 'react-icons/md';
import Sidebar from "./../../components/admin/Sidebar";
import Navbar from "./../../components/admin/Navbar";


const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        {/* Admin Panel */}
        <div className="w-full p-4">
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
            {/* Add admin panel components here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
