import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState({
        appointmentId: "",
        date: "",
        time: "",
        reason: ""
    });

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const doctorId = user[0];

    const todayDate = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/appointments/doctor/${doctorId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAppointments(res.data);
            } catch (err) {
                console.error("Error fetching appointments:", err);
            }
        };
        fetchAppointments();
    }, [doctorId, token]);

    const handleUpdate = async (appointmentId) => {
        const { date, time, reason } = selectedAppointment;

        if (!date || !time || !reason) {
            setMessage("Please fill in all fields.");
            return;
        }

        if (date < todayDate) {
            setMessage("You cannot set an appointment in the past.");
            return;
        }

        try {
            const res = await axios.put(
                `http://localhost:5000/api/appointments/update/${appointmentId}`,
                selectedAppointment,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage("Appointment updated successfully!");

            setAppointments((prev) =>
                prev.map((app) =>
                    app._id === appointmentId
                        ? { ...app, ...res.data.appointment, patient: app.patient }
                        : app
                )
            );

            setSelectedAppointment({ appointmentId: "", date: "", time: "", reason: "" });
        } catch (err) {
            setMessage("Error updating appointment: " + err.message);
        }
    };

    const handleCancel = async (appointmentId) => {
        try {
            await axios.delete(`http://localhost:5000/api/appointments/cancel/${appointmentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage("Appointment cancelled successfully!");
            setAppointments((prev) => prev.filter((app) => app._id !== appointmentId));
        } catch (err) {
            setMessage("Error canceling appointment: " + err.message);
        }
    };

    const handleInputChange = (e) => {
        setSelectedAppointment({
            ...selectedAppointment,
            [e.target.id]: e.target.value
        });
    };

    return (
        <>
            <Navbar />

            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-2xl font-semibold text-center">Doctor Dashboard</h2>

                {message && (
                    <div className="mt-4 text-center text-green-600 font-medium">
                        {message}
                    </div>
                )}

                <h3 className="text-xl font-medium mt-8">Your Appointments</h3>

                {appointments.length === 0 ? (
                    <p className="mt-4 text-center text-gray-600">No appointments scheduled.</p>
                ) : (
                    <ul className="mt-4 space-y-4">
                        {appointments.map((app) => (
                            <li
                                key={app._id}
                                className="bg-white p-4 rounded-lg shadow-md"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-lg">
                                            {app.patient?.username ?? "Unknown Patient"}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Date: {new Date(app.date).toDateString()}
                                        </p>
                                        <p className="text-sm text-gray-600">Time: {app.time}</p>
                                        <p className="text-sm text-gray-600">Reason: {app.reason}</p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleCancel(app._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() =>
                                                setSelectedAppointment({
                                                    appointmentId: app._id,
                                                    date: app.date,
                                                    time: app.time,
                                                    reason: app.reason
                                                })
                                            }
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {selectedAppointment.appointmentId && (
                    <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Update Appointment</h3>
                        <div className="space-y-4">
                            <input
                                id="date"
                                type="date"
                                value={selectedAppointment.date}
                                onChange={handleInputChange}
                                min={todayDate}
                                className="w-full p-3 border border-gray-300 rounded"
                            />
                            <input
                                id="time"
                                type="time"
                                value={selectedAppointment.time}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded"
                            />
                            <input
                                id="reason"
                                placeholder="Reason"
                                value={selectedAppointment.reason}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded"
                            />

                            <div className="flex gap-4">
                                <button
                                    onClick={() =>
                                        handleUpdate(selectedAppointment.appointmentId)
                                    }
                                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                                >
                                    Submit Update
                                </button>
                                <button
                                    onClick={() =>
                                        setSelectedAppointment({
                                            appointmentId: "",
                                            date: "",
                                            time: "",
                                            reason: ""
                                        })
                                    }
                                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                                >
                                    Hide Update Form
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DoctorDashboard;
