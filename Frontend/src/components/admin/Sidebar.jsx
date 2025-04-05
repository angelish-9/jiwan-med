import { NavLink } from 'react-router-dom'
import { BiPlusCircle } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { MdList } from 'react-icons/md';
const Sidebar = () => {

  const role = localStorage.getItem('role');

  if (role !== 'admin') {
    return null; // Don't show sidebar if not admin
  }

  return (
    <div className='w-[18%]  min-h-screen border-r-2'>
      <div className='flex flex-col gap4 pt-6 pl-[20%] text-[15px]'>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'
          to='/admin/add'
        >
          <BiPlusCircle size={30} />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'
          to='/list-product'
        >
          <MdList size={30} />
          <p className='hidden md:block'>List Items</p>
        </NavLink>
        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'
          to='/orders'
        >
          <HiOutlineReceiptRefund size={30} />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar