import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { Trash2, Filter, ArrowDownUp } from 'lucide-react';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
        setFiltered(response.data.products);
        const cats = [...new Set(response.data.products.map(p => p.category))];
        setCategories(cats);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSort = (field) => {
    const sorted = [...filtered].sort((a, b) => {
      if (field === 'price') return a.price - b.price;
      return a.name.localeCompare(b.name);
    });
    setFiltered(sorted);
    setSortBy(field);
  };

  const handleFilter = (category) => {
    if (!category) {
      setFiltered(list);
      setFilterBy('');
    } else {
      const filteredList = list.filter((item) => item.category === category);
      setFiltered(filteredList);
      setFilterBy(category);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold">🛒 All Products</h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center border rounded px-2 py-1">
            <Filter size={16} className="mr-1" />
            <select
              value={filterBy}
              onChange={(e) => handleFilter(e.target.value)}
              className="bg-transparent outline-none text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option value={cat} key={idx}>
                  {cat.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => handleSort('name')}
            className={`flex items-center gap-1 text-sm px-3 py-1 border rounded hover:bg-blue-100 ${sortBy === 'name' && 'bg-blue-200'}`}
          >
            <ArrowDownUp size={16} /> Name
          </button>
          <button
            onClick={() => handleSort('price')}
            className={`flex items-center gap-1 text-sm px-3 py-1 border rounded hover:bg-blue-100 ${sortBy === 'price' && 'bg-blue-200'}`}
          >
            <ArrowDownUp size={16} /> Price
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center py-10">Loading products...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="hidden md:grid grid-cols-[60px_2fr_1fr_1fr_60px] text-sm font-medium bg-gray-100 px-4 py-2 rounded-t">
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p className="text-center">Action</p>
          </div>

          {filtered.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[60px_2fr_1fr_1fr_60px] items-center text-sm border-t px-4 py-2"
            >
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <p>{item.name}</p>
              <p className="capitalize">{item.category.replace(/_/g, ' ')}</p>
              <p>{currency + item.price}</p>
              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-500 hover:text-red-700 flex justify-center"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
