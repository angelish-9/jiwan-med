import { NavLink } from 'react-router-dom';
import {
  BiPlusCircle,
  BiUserCheck,
  BiSolidOffer,
  BiCalendarCheck,
} from 'react-icons/bi';
import { HiOutlineShoppingBag, HiOutlineClipboardList } from 'react-icons/hi';

const Sidebar = () => {
  const role = localStorage.getItem('role');

  if (role !== 'admin') return null;

  const links = [
    {
      to: '/admin/dashboard',
      icon: <BiSolidOffer size={20} />,
      label: 'Dashboard',
    },
    {
      to: '/admin/add',
      icon: <BiPlusCircle size={20} />,
      label: 'Add Product',
    },
    {
      to: '/list-product',
      icon: <HiOutlineClipboardList size={20} />,
      label: 'Product List',
    },
    {
      to: '/admin/orders',
      icon: <HiOutlineShoppingBag size={20} />,
      label: 'Orders',
    },
    {
      to: '/admin/update-role',
      icon: <BiUserCheck size={20} />,
      label: 'User Roles',
    },
    {
      to: '/admin/promocodes',
      icon: <BiSolidOffer size={20} />,
      label: 'Promo Codes',
    },
    {
      to: '/admin/appointment-list',
      icon: <BiCalendarCheck size={20} />,
      label: 'Appointments',
    },
  ];

  const linkClass =
    'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300';

  const defaultStyle = 'text-gray-200 hover:bg-red-500 hover:text-white';
  const activeStyle = 'bg-white text-red-900 shadow-md';

  return (
    <aside className="w-[18%] min-h-screen bg-gradient-to-b from-red-700 to-red-800 px-4 py-6 shadow-xl flex flex-col justify-between">
      <div>
        <h1 className="text-white text-2xl font-bold mb-8 text-center tracking-wide">
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-2">
          {links.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeStyle : defaultStyle}`
              }
            >
              {icon}
              <span className="hidden md:block">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <footer className="text-center text-xs text-gray-400 mt-10">
        &copy; {new Date().getFullYear()} Jiwan Medico
      </footer>
    </aside>
  );
};

export default Sidebar;
