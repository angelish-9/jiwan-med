import { useState } from 'react';
import FaqBanner from '../components/FAQ/FaqBanner';
import Sidebar from '../components/FAQ/Sidebar';

const FAQs = {
  'All Category': [
    {
        question: "What are the modes of payment for purchasing Jiwan Medico?",
        answer: "Khalti, Connect IPS, Bank transfer for Nepali customers. For international customers: Paypal, Skrill, WIRE transfer."
      },
      {
        question: "Where can I find the pricing details?",
        answer: "You can click on the below link to check for the pricing. https://jiwanmedico.in/pricing"
      },
      ],
  'PRICING': [
    {
      question: "What are the modes of payment for purchasing Jiwan Medico?",
      answer: "Khalti, Connect IPS, Bank transfer for Nepali customers. For international customers: Paypal, Skrill, WIRE transfer."
    },
    {
      question: "Where can I find the pricing details?",
      answer: "You can click on the below link to check for the pricing. https://jiwanmedico.in/pricing"
    },
  ],
  'PRODUCT(APP) RELATED': [
    {
      question: "How to see previous year data?",
      answer: "A backup of your previous year data will be created in your device/google-drive at the time of closing book. Restore that file to your Jiwan Medico to see your previous year data."
    },
  ]
};

const FAQpage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Category');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const currentFaqs = FAQs[selectedCategory] || [];

  return (
    <div>
      <FaqBanner />

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto p-4">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <Sidebar topics={Object.keys(FAQs)} onCategoryChange={handleCategoryChange} />
        </div>

        {/* FAQ Content */}
        <div className="md:w-3/4 bg-white rounded-lg shadow-md p-4">
          {currentFaqs.length > 0 ? (
            currentFaqs.map((faq, index) => (
              <div key={index} className="mb-6 border-b pb-4">
                <h3 className="text-lg font-semibold text-teal-700 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No FAQs available in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQpage;
