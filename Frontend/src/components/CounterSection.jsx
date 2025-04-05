import { useEffect, useState } from "react";

const CounterSection = () => {
  const countersData = [
    {
      icon: "fas fa-user-graduate",
      target: 65000000,
      label: "Patients Cure",
      format: "10m+",
    },
    { icon: "fas fa-graduation-cap", target: 4.75, label: "Customer Ratings" },
    { icon: "fas fa-book", target: 100000, label: "Medicines" },
    { icon: "fas fa-chalkboard-teacher", target: 3000, label: "Active Compositions" },
  ];

  const [counts, setCounts] = useState(countersData.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prevCounts) =>
        prevCounts.map((count, index) => {
          const target = countersData[index].target;
          const increment = Math.ceil(target / 200);
          return count < target ? Math.min(count + increment, target) : count;
        })
      );
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num, index) => {
    if (countersData[index].format) return countersData[index].format;
    return num.toLocaleString();
  };

  return (
    <div className="relative bg-cover bg-center text-white text-center py-16 px-6"
      style={{ backgroundImage: `url('/images/slider1.jpg')` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h1>
        <p className="text-lg text-gray-300">Here you can review some statistics about our Jiwan Medico</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {countersData.map((counter, index) => (
            <div key={index} className="text-center">
              <i className={`${counter.icon} text-5xl mb-3`}></i>
              <p className="text-3xl font-bold">{formatNumber(counts[index], index)}</p>
              <p className="text-lg text-gray-300">{counter.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
