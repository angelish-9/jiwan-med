import { useEffect, useState } from "react";
import axios from "axios";
import {
  CalendarDays,
  Clock,
  User,
  Stethoscope,
  XCircle,
  BadgeCheck,
  Hourglass,
  ChevronDown,
} from "lucide-react";
import Sidebar from "./../../components/admin/Sidebar";
import Navbar from "./../../components/admin/Navbar";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/appointments/${selectedAppointment._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSelectedAppointment(null);
      fetchAppointments();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments
    .filter((app) => {
      const patient = app.patient?.username?.toLowerCase() || "";
      const doctor = app.doctor?.username?.toLowerCase() || "";
      const matchesSearch =
        patient.includes(searchTerm.toLowerCase()) ||
        doctor.includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || app.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="w-full p-6 bg-gradient-to-br from-blue-100 to-white">
          <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <h1 className="text-3xl font-bold text-blue-800">📋 Manage Appointments</h1>
              <div className="flex flex-wrap gap-4 items-center">
                <input
                  type="text"
                  placeholder="Search by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border rounded-xl shadow-sm focus:ring focus:ring-blue-300"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border rounded-xl shadow-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {filteredAppointments.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">No appointments found.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAppointments.map((app) => (
                  <div
                    key={app._id}
                    onClick={() => {
                      setSelectedAppointment(app);
                      setNewStatus(app.status || "pending");
                    }}
                    className="bg-blue-50 hover:bg-blue-100 transition-all duration-300 border border-blue-200 rounded-xl shadow-md p-6 cursor-pointer"
                  >
                    <h2 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
                      <User className="w-5 h-5" /> {app.patient?.username}
                    </h2>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Stethoscope className="w-4 h-4" /> {app.doctor?.username} ({app.doctor?.position})
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" /> {new Date(app.date).toDateString()}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> {app.time}
                    </p>
                    <div className={`mt-3 inline-block text-sm font-semibold px-3 py-1 rounded-full ${statusColors[app.status || "pending"]}`}>
                      {app.status || "pending"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg animate-fadeIn">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">🔧 Update Appointment</h3>
            <p className="mb-2"><strong>Patient:</strong> {selectedAppointment.patient?.username}</p>
            <p className="mb-2"><strong>Doctor:</strong> {selectedAppointment.doctor?.username}</p>
            <p className="mb-2"><strong>Position:</strong> {selectedAppointment.doctor?.position}</p>
            <p className="mb-2"><strong>Date:</strong> {new Date(selectedAppointment.date).toDateString()}</p>
            <p className="mb-4"><strong>Time:</strong> {selectedAppointment.time}</p>

            <label className="block font-semibold mb-1">Status:</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full mb-6 px-4 py-2 border rounded-xl"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentList;
