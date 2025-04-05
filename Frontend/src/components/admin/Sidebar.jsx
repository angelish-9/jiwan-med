import { NavLink } from 'react-router-dom';
import { BiPlusCircle } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { MdList } from 'react-icons/md';

const Sidebar = () => {
  const role = localStorage.getItem('role');

  if (role !== 'admin') return null;

  const linkClass =
    'flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white hover:text-black transition-all duration-200';

  const activeClass =
    'bg-white text-black shadow-md';

  return (
    <div className='w-[18%] min-h-screen bg-gradient-to-b from-indigo-600 to-indigo-800 px-4 py-6 shadow-lg'>
      <h2 className="text-white text-xl font-bold mb-10 text-center">Admin Panel</h2>
      <div className='flex flex-col gap-4'>
        <NavLink
          to='/admin/add'
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }
        >
          <BiPlusCircle size={24} />
          <span className='hidden md:block'>Add Items</span>
        </NavLink>

        <NavLink
          to='/list-product'
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }
        >
          <MdList size={24} />
          <span className='hidden md:block'>List Items</span>
        </NavLink>

        <NavLink
          to='/Orders'
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }
        >
          <HiOutlineReceiptRefund size={24} />
          <span className='hidden md:block'>Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
