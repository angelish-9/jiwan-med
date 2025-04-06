import ProductCard from "./ProductCard";
import product1 from '../assets/product1.jpeg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';
import product4 from '../assets/product4.jpeg';


const products = [
  {
    image: product1,
    name: "Vitamin B Complex",
    rating: 5,
    reviews: 120,
    price: 99.99,
    stock: 15,
  },
  {
    image: product2,
    name: "Metformin Tablets",
    rating: 4,
    reviews: 85,
    price: 19.99,
    stock: 50,
  },
  {
    image: product3,
    name: "Tusq-D Cough Syrup",
    rating: 5,
    reviews: 200,
    price: 49.99,
    stock: 30,
  },
  {
    image: product4,
    name: "Desire Condom",
    rating: 5,
    reviews: 200,
    price: 49.99,
    stock: 30,
  },
];

const ProductList = () => {
  return (
    <section className="container mx-auto px-4 py-6">
      <header className="text-center">
        {/* <h1 className="text-3xl font-bold">Top Trending Products</h1>
        <p className="text-gray-500">Discover our best-selling items</p> */}
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
