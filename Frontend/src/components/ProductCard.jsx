import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ image, name, rating, reviews, price, stock, id }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 w-full max-w-xs mx-auto">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {name}
        </h3>

        <div className="flex items-center text-yellow-500 text-sm">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"}>★</span>
        ))}
          <span className="text-gray-500 ml-2">({reviews})</span>

          <span className="text-gray-500 ml-2">({reviews})</span>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p
            className={`text-sm font-medium ${
              stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-red-600">${price.toFixed(2)}</p>
            <Link
              to={`/product/${id}`}
              className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition"
            >
              View
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
};

export default ProductCard;
