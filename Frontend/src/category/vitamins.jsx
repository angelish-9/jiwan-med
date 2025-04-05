import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import vitamin1 from "../assets/med.jpeg";
import vitamin2 from "../assets/med.jpeg";
import vitamin3 from "../assets/med.jpeg";

const vitaminProducts = [
  { id: 1, name: "Devitamin", price: 24.99, image: vitamin1, rating: 4, reviews: 120, stock: 10 },
  { id: 2, name: "Dolopar", price: 59.99, image: vitamin3, rating: 5, reviews: 85, stock: 5 },
  { id: 3, name: "Pyrimide", price: 34.99, image: vitamin2, rating: 3, reviews: 45, stock: 0 }
];

const Vitamin = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Vitamins & Nutrition</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vitaminProducts.map(({ id, name, price, image, rating, reviews, stock }) => (
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

export default Vitamin;
