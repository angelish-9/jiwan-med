import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product } from '../models/Product.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, bestseller } = req.body;


        const image = req.file;


        if (!image) {
            return res.status(400).json({ success: false, message: 'Image is required.' });
        }


        const imageDirectory = path.join(process.cwd(), 'uploads', 'product-images');


        if (!fs.existsSync(imageDirectory)) {
            fs.mkdirSync(imageDirectory, { recursive: true });
        }


        const imageName = `${Date.now()}-${image.originalname}`;
        const imagePath = path.join(imageDirectory, imageName);


        fs.copyFileSync(image.path, imagePath);


        fs.unlinkSync(image.path);


        const imageUrl = `/uploads/product-images/${imageName}`;


        const productData = {
            name,
            description,
            category,
            price: Number(price),
            bestseller: bestseller === "true" ? true : false,
            image: imageUrl,
            date: Date.now()
        };

        console.log(productData);


        const product = new Product(productData);
        await product.save();

        res.json({ success: true, message: "Product added to the Database" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product remove succesfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }

}
const editProduct = async (req, res) => {
    try {
        const { name, description, price, bestseller } = req.body;
        const { id } = req.params;

        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        let imageUrl = existingProduct.image;

        // If new image is uploaded
        if (req.file) {
            const imageDirectory = path.join(process.cwd(), 'uploads', 'product-images');

            // Create the directory if it doesn't exist
            if (!fs.existsSync(imageDirectory)) {
                fs.mkdirSync(imageDirectory, { recursive: true });
            }

            const imageName = `${Date.now()}-${req.file.originalname}`;
            const imagePath = path.join(imageDirectory, imageName);

            // Move new file from temp to target directory
            fs.copyFileSync(req.file.path, imagePath);

            // Remove temp file
            fs.unlinkSync(req.file.path);

            // Delete existing image(s) if any
            if (Array.isArray(imageUrl)) {
                imageUrl.forEach((imgPath) => {
                    const fullOldImagePath = path.join(process.cwd(), imgPath);
                    if (fs.existsSync(fullOldImagePath)) {
                        fs.unlinkSync(fullOldImagePath);
                    }
                });
            }

            // Set new image path as array
            imageUrl = [`/uploads/product-images/${imageName}`];
        }

        // Update product fields
        existingProduct.name = name;
        existingProduct.description = description;
        existingProduct.price = Number(price);
        existingProduct.bestseller = bestseller === "true" || bestseller === true;
        existingProduct.image = imageUrl;

        await existingProduct.save();

        res.json({ success: true, message: 'Product updated successfully.' });

    } catch (error) {
        console.error('Edit product error:', error);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
};

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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


const categoryProduct = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category });

        if (!products) {
            return res.status(404).json({ message: 'No products found for this category' });
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export { addProduct, removeProduct, editProduct, listProduct, singleProduct, categoryProduct }