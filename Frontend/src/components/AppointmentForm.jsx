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
    reason: "",
    preferredMode: "physical"
  });

  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchDoctors = async () => {
      const res = await axios.get("http://localhost:5000/api/appointments/doctors");
      setDoctors(res.data);
    };
    fetchDoctors();

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
    setErrors({ ...errors, [e.target.id]: "" });
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
      setFormData({ doctorId: "", date: "", time: "", reason: "", preferredMode: "physical" });
      const res = await axios.get("http://localhost:5000/api/appointments/past", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(res.data);
    } catch (err) {
      alert("Error: " + err.response?.data?.error || err.message);
    }
  };

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
              {/* Navigation content here */}
            <Navbar />
            </nav>
      <div className="container mx-auto px-4 py-10 mt-28 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-red-50 to-white p-8 rounded-3xl shadow-2xl border space-y-6"
        >
          <h2 className="text-4xl font-bold text-red-700 text-center">Book Your Appointment 🏥</h2>

          {/* Doctor Select */}
          <div>
            <label htmlFor="doctorId" className="block text-lg font-medium text-gray-700">
              Choose Doctor
            </label>
            <select
              id="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              className={`mt-1 w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${errors.doctorId ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-red-500"}`}
            >
              <option value="">-- Select --</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.username} ({doc.position})
                </option>
              ))}
            </select>
            {errors.doctorId && <p className="text-red-500 text-sm mt-1">{errors.doctorId}</p>}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-left text-lg font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                min={todayDate}
                value={formData.date}
                onChange={handleChange}
                className={`mt-1 w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${errors.date ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-red-500"}`}
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
            </div>
            <div>
              <label htmlFor="time" className="block text-left text-lg font-medium text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={handleChange}
                className={`mt-1 w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${errors.time ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-red-500"}`}
              />
              {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
            </div>
          </div>

          {/* Reason */}
          <div>
            <label htmlFor="reason" className="block text-left text-lg font-medium text-gray-700">Reason</label>
            <textarea
              id="reason"
              rows="3"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Why do you need an appointment?"
              className={`mt-1 w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 ${errors.reason ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-red-500"}`}
            />
            {errors.reason && <p className="text-red-500 text-sm mt-1">{errors.reason}</p>}
          </div>

          {/* Mode of Appointment */}
          <div>
            <label className="block text-left text-lg font-medium text-gray-700">Mode of Appointment</label>
            <div className="flex gap-4 mt-2">
            {['physical', 'video', 'audio'].map((mode) => (
  <label key={mode} className="flex items-center gap-2">
    <input
      type="radio"
      id="preferredMode"
      name="preferredMode"
      value={mode}
      checked={formData.preferredMode === mode}
      onChange={(e) => {
        if (mode === 'video' || mode === 'audio') {
          alert(`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode is currently under maintenance.`);
        } else {
          setFormData({ ...formData, preferredMode: e.target.value });
        }
      }}
    />
    <span className="capitalize">{mode}</span>
  </label>
))}

            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Confirm Appointment
          </button>
        </form>

        {/* Appointments History */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl border overflow-y-auto max-h-[85vh]">
          <h2 className="text-3xl font-bold text-red-700 text-center mb-6">Your Appointments</h2>

          {appointments.length === 0 ? (
            <p className="text-center text-gray-500">No previous appointments found.</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((app) => (
                <div key={app._id} className="border border-gray-300 p-4 rounded-xl shadow-sm">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-red-900">Dr. {app.doctor.username}</p>
                      <p className="text-sm text-gray-600">{app.doctor.position}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${app.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {app.status || "Pending"}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-left text-gray-700">
                    <p><strong>Date:</strong> {new Date(app.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {app.time}</p>
                    <p><strong>Mode:</strong> {app.preferredMode}</p>
                    <p><strong>Reason:</strong> {app.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;