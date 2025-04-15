import PropTypes from "prop-types";

const DoctorCard = ({ name, specialization, image, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-full max-w-xs">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">{specialization}</p>
        <button
          className="mt-2 px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-semibold"
          onClick={onBook}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

DoctorCard.propTypes = {
  name: PropTypes.string.isRequired,
  specialization: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onBook: PropTypes.func.isRequired,
};

export default DoctorCard;
