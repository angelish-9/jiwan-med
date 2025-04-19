import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarDays, Clock, User, Stethoscope } from "lucide-react"; // Optional: if using lucide icons
import Sidebar from "./../../components/admin/Sidebar";
import Navbar from "./../../components/admin/Navbar";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if token is stored in localStorage
        }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments:", err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
      <Sidebar />
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">📅 Appointment Schedule</h2>

          {appointments.length === 0 ? (
            <p className="text-center text-gray-500">No appointments found.</p>
          ) : (
            <ul className="space-y-6">
              {appointments.map((app) => (
                <li
                  key={app._id}
                  className="bg-blue-50 hover:bg-blue-100 transition duration-200 rounded-xl shadow p-6 border border-blue-200"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="space-y-1">
                      <p className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                        <User className="w-5 h-5" /> {app.patient?.username}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Stethoscope className="w-4 h-4" /> Doctor: {app.doctor?.username}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" /> {new Date(app.date).toDateString()}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> {app.time}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentList;
