import { NavLink } from 'react-router-dom';
import { BiPlusCircle } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { MdList } from 'react-icons/md';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[18%] border-r-2 bg-white">
        <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
          <NavLink
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
            to="/admin/add"
          >
            <BiPlusCircle size={30} />
            <p className="hidden md:block">Add Items</p>
          </NavLink>
          <NavLink
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
            to="/list-product"
          >
            <MdList size={30} />
            <p className="hidden md:block">List Items</p>
          </NavLink>
          <NavLink
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
            to="/admin/orders"
          >
            <HiOutlineReceiptRefund size={30} />
            <p className="hidden md:block">Orders</p>
          </NavLink>
        </div>
      </div>

      {/* Admin Panel */}
      <div className="w-full p-4">
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
          {/* Add admin panel components here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
