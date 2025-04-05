import { useState } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [appointment, setAppointment] = useState({
    patientName: '',
    doctorName: '',
    date: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({
      ...appointment,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/appointments/add', appointment)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <input type="text" name="patientName" placeholder="Patient Name" value={appointment.patientName} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <input type="text" name="doctorName" placeholder="Doctor Name" value={appointment.doctorName} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <input type="date" name="date" value={appointment.date} onChange={handleChange} className="w-full p-2 mb-2 border rounded" />
      <select name="type" value={appointment.type} onChange={handleChange} className="w-full p-2 mb-2 border rounded">
        <option value="">Select Appointment Type</option>
        <option value="in-person">In-Person</option>
        <option value="online">Online</option>
      </select>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
