import { useState, useEffect } from 'react';
import axios from 'axios';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/medicines')
      .then(response => {
        setMedicines(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-2">Medicine List</h2>
      <ul>
        {medicines.map(medicine => (
          <li key={medicine._id} className="p-2 border-b">{medicine.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineList;
