import { Product } from '../models/Product.js';


const addProduct = async (req, res) => {
    try {
        const { name, description, category, price, subCategory, bestseller} = req.body;

        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice)) {
          return res.status(400).json({ success: false, message: "Invalid price value." });
        }

        const newProduct = new Product({
            name,
            description,
            category,
            price: numericPrice,
            subCategory,
            bestseller: bestseller === "true",
        });

        await newProduct.save();
        res.json({ success: true, message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, message: 'Product removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.params; 

        const product = await Product.findById(productId); 

        if (!product) {
            return res.json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, product });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }

};


const listProduct = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

export { addProduct, removeProduct, listProduct, singleProduct }