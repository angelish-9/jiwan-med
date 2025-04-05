import PropTypes from "prop-types";

const ProductCard = ({ image, name, rating, reviews, price, stock }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-2">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <div className="flex items-center text-yellow-500 mt-2">
          {"★".repeat(rating)}
          <span className="text-gray-600 text-sm ml-1">({reviews})</span>
        </div>
        <p className="text-gray-600 text-sm mt-1">{stock > 0 ? "In Stock" : "Out of Stock"}</p>
        <p className="text-red-500 font-bold text-lg mt-2">${price}</p>
      </div>
    </div>
  );
};

// PropTypes for validation
ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
};

export default ProductCard;
