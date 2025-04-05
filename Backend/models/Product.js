import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  subCategory: { type: String, required: true },
  bestseller: { type: Boolean, default: false },
});

const Product = mongoose.model('Product', productSchema);
export { Product };

