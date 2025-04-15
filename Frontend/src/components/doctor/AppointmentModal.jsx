import PropTypes from "prop-types";

const AppointmentModal = ({ doctor, onClose }) => {
  const times = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM"];
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Book Appointment with {doctor.name}</h2>
        
        <form className="space-y-3">
          <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Phone Number" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Hospital/Clinic" className="w-full border p-2 rounded" />
          
          <label className="block">Appointment Date:</label>
          <input type="date" className="w-full border p-2 rounded" />
          
          <label className="block mt-2">Appointment Time:</label>
          <div className="grid grid-cols-3 gap-2">
            {times.map((time, i) => (
              <button
                type="button"
                key={i}
                className="border p-2 rounded hover:bg-blue-100"
              >
                {time}
              </button>
            ))}
          </div>
          
          <textarea
            placeholder="Description"
            rows="3"
            className="w-full border p-2 rounded mt-3"
          ></textarea>
          
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 mt-3"
          >
            Book An Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

AppointmentModal.propTypes = {
  doctor: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AppointmentModal;
