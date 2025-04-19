import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DoctorCard from "../../components/doctor/DoctorCard";
import AppointmentModal from "../../components/doctor/AppointmentModal";


const doctors = [
  {
    name: "Dr. Aditi Roychowdhury",
    specialization: "Cardiologist",
    image: "/images/doctor1.jpg", // adjust the path based on your setup
  },
  {
    name: "Dr. Alok Roychowdhury",
    specialization: "Dermatologist",
    image: "/images/doctor1.jpg",
  },
  {
    name: "Dr. Mihir Roychowdhury",
    specialization: "Neurologist",
    image: "/images/doctor1.jpg",
  },
  {
    name: "Dr. Mihir Roychowdhury",
    specialization: "Neurologist",
    image: "/images/doctor1.jpg",
  },
  {
    name: "Dr. Mihir Roychowdhury",
    specialization: "Neurologist",
    image: "/images/doctor1.jpg",
  },
  {
    name: "Dr. Mihir Roychowdhury",
    specialization: "Neurologist",
    image: "/images/doctor1.jpg",
  },
  {
    name: "Dr. Mihir Roychowdhury",
    specialization: "Neurologist",
    image: "/images/doctor1.jpg",
  },
  {
    name: "Dr. Mihir Roychowdhury",
    specialization: "Neurologist",
    image: "/images/doctor1.jpg",
  },
];

const Doctors = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleBookClick = (doctor) => setSelectedDoctor(doctor);
  const closeModal = () => setSelectedDoctor(null);
  return (
    <div className="flex flex-col items-center  min-h-screen  bg-gray-100">
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow">
          <Navbar />
        </nav>
    <section className="container mt-28 mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">OUR DOCTORS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doc, index) => (
          <DoctorCard key={index} {...doc} onBook={() => handleBookClick(doc)}/>
        ))}
      </div>
      {selectedDoctor && (
        <AppointmentModal doctor={selectedDoctor} onClose={closeModal} />
      )}
    </section>
    <div>
    <Footer />
    </div>
    </div>
  );
};

export default Doctors;
