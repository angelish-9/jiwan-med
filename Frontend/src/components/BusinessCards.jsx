const businessCardsData = [
    {
      title: "Consult with Pharmacists!",
      description: "Cure what you suffer. Jiwan Medico gives you the tools to consult, online with pharmacist.",
      buttonText: "Start Consulting →",
      buttonStyle: "bg-blue-500 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-500",
    },
    {
      title: "Consult with Best Doctor!",
      description: "Book an appointment and consult with your doctor online.",
      buttonText: "Book an Appointment →",
      buttonStyle: "bg-gray-800 text-white border-2 border-black hover:bg-white hover:text-black",
    },
  ];
  
  const BusinessCards = () => {
    return (
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto p-6">
        {businessCardsData.map((card, index) => (
          <div
            key={index}
            className="bg-white p-12 rounded-lg shadow-md flex-1 transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
            <p className="text-gray-600 text-lg mb-6">{card.description}</p>
            <a
              href="#"
              className={`inline-block px-6 py-3 rounded-md text-lg font-semibold transition-colors duration-300 ${card.buttonStyle}`}
            >
              {card.buttonText}
            </a>
          </div>
        ))}
      </div>
    );
  };
  
  export default BusinessCards;
  