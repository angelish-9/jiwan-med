import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: "",
    date: "",
    time: "",
    reason: ""
  });

  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();


  useEffect(() => {

    // If no token is found, redirect to login page
    if (!token) {
      navigate("/signin");
      return;
    }

    // Fetch doctors for the form
    const fetchDoctors = async () => {
      const res = await axios.get("http://localhost:5000/api/appointments/doctors");
      setDoctors(res.data);
    };
    fetchDoctors();

    // Fetch past appointments for the user
    const fetchAppointments = async () => {
      const res = await axios.get("http://localhost:5000/api/appointments/past", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    };
    fetchAppointments();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // Clear error when typing
  };

  const validate = () => {
    const newErrors = {};
    const today = new Date().toISOString().split("T")[0];

    if (!formData.doctorId) newErrors.doctorId = "Please select a doctor.";
    if (!formData.date) newErrors.date = "Please select a date.";
    else if (formData.date < today) newErrors.date = "You can't select a past date.";
    if (!formData.time) newErrors.time = "Please select a time.";
    if (!formData.reason.trim()) newErrors.reason = "Please provide a reason.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:5000/api/appointments", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Appointment booked!");
      setFormData({ doctorId: "", date: "", time: "", reason: "" });

      // Fetch updated appointments after booking
      const res = await axios.get("http://localhost:5000/api/appointments/past", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (err) {
      alert("Error: " + err.response?.data?.error || err.message);
    }
  };

  const todayDate = new Date().toISOString().split("T")[0]; // format: yyyy-mm-dd

  return (
    <>
      <Navbar />
      <div className="flex space-x-10 mt-8">
        {/* Appointment Form (Left Side) */}
        <form
          onSubmit={handleSubmit}
          className="w-1/2 bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-blue-700">📋 Book Appointment</h2>

          {/* Doctor */}
          <div>
            <label htmlFor="doctorId" className="block text-gray-700 font-semibold mb-1">
              Select Doctor
            </label>
            <select
              id="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              required
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.doctorId ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.username}
                </option>
              ))}
            </select>
            {errors.doctorId && <p className="text-red-500 text-sm mt-1">{errors.doctorId}</p>}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-gray-700 font-semibold mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              min={todayDate}
              required
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.date ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          {/* Time */}
          <div>
            <label htmlFor="time" className="block text-gray-700 font-semibold mb-1">
              Time
            </label>
            <input
              type="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              required
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.time ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
          </div>

          {/* Reason */}
          <div>
            <label htmlFor="reason" className="block text-gray-700 font-semibold mb-1">
              Reason
            </label>
            <input
              id="reason"
              placeholder="Reason for appointment"
              value={formData.reason}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.reason ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
            />
            {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Book Appointment
          </button>
        </form>

        {/* Past Appointments (Right Side) */}
        <div className="w-1/2 bg-white p-8 rounded-xl shadow-lg space-y-6">
          <h2 className="text-2xl font-bold text-center text-blue-700">📅 Past Appointments</h2>

          {appointments.length === 0 ? (
            <p className="text-center text-gray-500">You have no past appointments.</p>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              <ul className="space-y-4">
                {appointments.map((appointment) => (
                  <li key={appointment._id} className="border-b py-2">
                    <p><strong>Doctor:</strong> Dr. {appointment.doctor.username}</p>
                    <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <p><strong>Reason:</strong> {appointment.reason}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
