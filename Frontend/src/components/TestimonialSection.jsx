import { useState } from "react";

const testimonialsData = [
  {
    img: "/images/person2.jpg",
    name: "Jack Graham",
    role: "Co-founder, Coffee Inc",
    text: "It was really fun getting to know the team during the project. They were all helpful in answering my questions and made me feel completely at ease. The design ended up being twice as good as I could have ever envisioned!",
  },
  {
    img: "/images/person1.jpg",
    name: "Aura Brooks",
    role: "Graphic Designer, Owl Eyes",
    text: "It was really fun getting to know the team during the project. They were all helpful in answering my questions and made me feel completely at ease. The design ended up being twice as good as I could have ever envisioned!",
  },
  {
    img: "/images/person3.jpg",
    name: "Ali TUFAN",
    role: "Client",
    text: "It was really fun getting to know the team during the project. They were all helpful in answering my questions and made me feel completely at ease. The design ended up being twice as good as I could have ever envisioned!",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Default to the middle testimonial

  return (
    <div className="text-center py-16 px-6 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say</h2>
      <p className="text-gray-500 text-lg mb-10">
        Cum doctus civibus efficiantur in imperdiet deterruisset.
      </p>

      <div className="flex justify-center items-start space-x-6 overflow-hidden">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className={`w-1/3 p-6 rounded-lg shadow-lg transition-all duration-300 ${
              index === activeIndex ? "bg-blue-500 text-white scale-105" : "bg-gray-100 text-gray-600"
            }`}
          >
            <p className="text-lg">{testimonial.text}</p>
            <div className="flex items-center justify-center mt-4">
              <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full mr-3" />
              <p className="text-sm">
                <strong>{testimonial.name}</strong> <br />
                {testimonial.role}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-2 mt-6">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeIndex ? "bg-gray-800 w-4 h-4" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
