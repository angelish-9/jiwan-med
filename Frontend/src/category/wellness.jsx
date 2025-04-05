import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import wellness1 from "../assets/med.jpeg";
import wellness2 from "../assets/med.jpeg";
import wellness3 from "../assets/med.jpeg";

const wellnessProducts = [
  { id: 1, name: "Dabur Chyawanprash", price: 24.99, image: wellness1, rating: 4, reviews: 120, stock: 10 },
  { id: 2, name: "Glucose", price: 59.99, image: wellness3, rating: 5, reviews: 85, stock: 5 },
  { id: 3, name: "Protein", price: 34.99, image: wellness2, rating: 3, reviews: 45, stock: 0 },
  { id: 4, name: "Ceratin", price: 34.99, image: wellness2, rating: 3, reviews: 45, stock: 0 },
  

];

const Wellness = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Wellness & Fitness</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wellnessProducts.map(({ id, name, price, image, rating, reviews, stock }) => (
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

export default Wellness;
