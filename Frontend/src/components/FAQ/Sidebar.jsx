import { useState } from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ topics, onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('All Category');

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">BROWSE BY TOPICS</h2>
      <div className="bg-white shadow-md rounded-lg">
        {topics.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`p-3 border-b last:border-none cursor-pointer transition-all ${
              activeCategory === category
                ? 'bg-teal-700 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

// Prop types validation
Sidebar.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.string).isRequired,
  onCategoryChange: PropTypes.func,
};

export default Sidebar;