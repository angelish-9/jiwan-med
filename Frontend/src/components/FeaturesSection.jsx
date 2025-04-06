import { FaPaperPlane, FaMapMarkedAlt, FaPalette, FaMoneyBillWave, FaCloudUploadAlt, FaFileInvoice, FaChartBar, FaStore } from 'react-icons/fa';

const features = [
  {
    icon: <FaPaperPlane className="text-red-500 text-3xl" />,
    title: "Emergency Delivery System",
    description: "Get life-saving medicines delivered to your doorstep within 2 hours during emergencies.",
  },
  {
    icon: <FaMapMarkedAlt className="text-red-500 text-3xl" />,
    title: "Dr. Appointment System",
    description: "Book doctor consultations with ease — choose physical, video, or audio appointments.",
  },
  {
    icon: <FaPalette className="text-red-500 text-3xl" />,
    title: "Real Time Pharmacist Chat",
    description: "Chat live with certified pharmacists for instant support and prescription approvals.",
  },
  {
    icon: <FaMoneyBillWave className="text-red-500 text-3xl" />,
    title: "Chronic Patient PromoCode",
    description: "Special discounts for patients with diabetes, thyroid, TB, and other chronic conditions.",
  },
  {
    icon: <FaFileInvoice className="text-red-500 text-3xl" />,
    title: "Prescription Management",
    description: "Easily upload, store, and track prescriptions for a smooth medicine ordering process.",
  },
  {
    icon: <FaFileInvoice className="text-red-500 text-3xl" />,
    title: "Delivery Tracking",
    description: "Track your medicine orders in real-time with live delivery updates and notifications.",
  },
  {
    icon: <FaChartBar className="text-red-500 text-3xl" />,
    title: "Lab Test",
    description: "Book lab tests online and get results delivered to your dashboard or email.",
  },
  {
    icon: <FaCloudUploadAlt className="text-red-500 text-3xl" />,
    title: "Automatic Data Backup",
    description: "Your data is safely and automatically backed up to prevent loss or damage.",
  },
  {
    icon: <FaChartBar className="text-red-500 text-3xl" />,
    title: "Hospital Devices",
    description: "Browse and order essential hospital equipment for home and professional use.",
  },
  {
    icon: <FaStore className="text-red-500 text-3xl" />,
    title: "Physical Store",
    description: "Visit our local pharmacy for in-person service and product pickup.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white p-6">
      <h2 className="text-4xl font-bold text-center mb-6">Features of Jiwan Medico</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {features.map((feature, index) => (
          <div key={index} className="min-w-[250px] border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              {feature.icon}
              <h3 className="text-xl font-semibold ml-2">{feature.title}</h3>
            </div>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;