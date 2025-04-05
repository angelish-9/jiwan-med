import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import pain1 from "../assets/med.jpeg";
import pain2 from "../assets/med.jpeg";
import pain3 from "../assets/med.jpeg";

const painProducts = [
  { id: 1, name: "Depain", price: 24.99, image: pain1, rating: 4, reviews: 120, stock: 10 },
  { id: 2, name: "Dolopar", price: 59.99, image: pain3, rating: 5, reviews: 85, stock: 5 },
  { id: 3, name: "Pyrimide", price: 34.99, image: pain2, rating: 3, reviews: 45, stock: 0 }
];


const Pain = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Pain & Relief</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {painProducts.map(({ id, name, price, image, rating, reviews, stock }) => (
            <ProductCard 
              key={id} 
              name={name} 
              price={price} 
              image={image} 
              rating={rating} 
              reviews={reviews} 
              stock={stock} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pain;
