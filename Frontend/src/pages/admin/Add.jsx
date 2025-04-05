import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BiPlusCircle } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { MdList } from 'react-icons/md';


import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Pain & Relief')
  const [bestseller, setBestSeller] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("bestseller", bestseller)

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post("http://localhost:5000/api/product/add", formData, {
        headers: { token }
      })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setCategory('Pain & Relief')
        setBestSeller(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Something went wrong!")
      console.error(error)
    }
  }

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

      <div>

        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
          <div>
            <p className='mb-2'>Upload Image</p>
            <div className='flex gap-2'>
              {[image1, image2, image3, image4].map((img, i) => (
                <label htmlFor={`image${i + 1}`} key={i}>
                  <img
                    className='w-24 cursor-pointer'
                    src={!img
                      ? "https://png.pngtree.com/png-vector/20221016/ourmid/pngtree-upload-file-vector-single-icon-clipart-transparent-background-png-image_6318311.png"
                      : URL.createObjectURL(img)}
                    alt=""
                  />
                  <input
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (i === 0) setImage1(file)
                      else if (i === 1) setImage2(file)
                      else if (i === 2) setImage3(file)
                      else setImage4(file)
                    }}
                    type="file"
                    id={`image${i + 1}`}
                    hidden
                  />
                </label>
              ))}
            </div>
          </div>

          <div className='w-full'>
            <p className='mb-2'>Product Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full max-w-[500px] px-3 py-2'
              type="text"
              placeholder='Product Name'
              required
            />
          </div>

          <div className='w-full'>
            <p className='mb-2'>Product Description</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full max-w-[500px] px-3 py-2'
              placeholder='Add description'
              required
            />
          </div>

          <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
            <div>
              <p className='mb-2'>Product Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='w-full px-3 py-2'
              >
                <option value="Pain">Pain & Relief</option>
                <option value="Wellness">Wellness & Fitness</option>
                <option value="Vitamins">Vitamins & Proteins</option>
              </select>
            </div>

            <div>
              <p className='mb-2'>Product Price</p>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='w-full px-3 py-2 sm:w-[120px]'
                type="number"
                placeholder='25'
                required
              />
            </div>
          </div>

          <div className='flex gap-2 mt-2'>
            <input
              checked={bestseller}
              onChange={() => setBestSeller(prev => !prev)}
              type="checkbox"
              id='bestseller'
            />
            <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
          </div>

          <button className='w-28 py-3 mt-4 bg-gray-900 text-white' type='submit'>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add
