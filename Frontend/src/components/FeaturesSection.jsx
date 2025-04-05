import { FaPaperPlane, FaMapMarkedAlt, FaPalette, FaMoneyBillWave, FaCloudUploadAlt, FaFileInvoice, FaChartBar, FaStore } from 'react-icons/fa';

const features = [
  {
    icon: <FaPaperPlane className="text-red-500 text-3xl" />,
    title: "Emergency Delivery System",
    description: "Using our free billing software, you can easily create useful documents. It includes quotations, estimates, and accurate GST invoices.",
  },
  {
    icon: <FaMapMarkedAlt className="text-red-500 text-3xl" />,
    title: "Dr. Appointment System",
    description: "Monitor orders seamlessly with our integrated order tracking system.",
  },
  {
    icon: <FaPalette className="text-red-500 text-3xl" />,
    title: "Real Time Pharmacist Chat",
    description: "Personalize your billing experience with various themes.",
  },
  {
    icon: <FaMoneyBillWave className="text-red-500 text-3xl" />,
    title: "Chronic Patient PromoCode",
    description: "Keep track of your business expenses in an organized manner.",
  },
{
    icon: <FaFileInvoice className="text-red-500 text-3xl" />,
    title: "Prescription Management",
    description: "Manage your business receivables and payables efficiently using our GST billing software.",
  },
  {
    icon: <FaFileInvoice className="text-red-500 text-3xl" />,
    title: "Delivery Challan",
    description: "Generate delivery challans easily with integrated GST billing software.",
  },
  {
    icon: <FaChartBar className="text-red-500 text-3xl" />,
    title: "Lab Test",
    description: "Generate comprehensive business reports for better decision-making.",
  },
  {
    icon: <FaCloudUploadAlt className="text-red-500 text-3xl" />,
    title: "Automatic Data Backup",
    description: "Keep your data secure with automatic backups.",
  },
  {
    icon: <FaChartBar className="text-red-500 text-3xl" />,
    title: "Regular / Thermal Printer",
    description: "Compatible with regular and thermal printers for seamless printing.",
  },
  {
    icon: <FaStore className="text-red-500 text-3xl" />,
    title: "Online Store",
    description: "Integrate your billing software with your online store for smooth operations.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white p-6">
      <h2 className="text-4xl font-bold text-center mb-6">Features of GST Billing and Accounting Software</h2>
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