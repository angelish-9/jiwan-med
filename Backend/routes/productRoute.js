import express from 'express';
import upload from '../middleware/multer.js';
import { addProduct, listProduct, removeProduct, singleProduct } from '../controller/productController.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// productRouter.post('/add', adminAuth, upload.single(), addProduct);
productRouter.post('/add', adminAuth, upload.single('image'), addProduct);

productRouter.get('/list', listProduct);

productRouter.get('/single/:productId', singleProduct);

productRouter.post('/remove', adminAuth, removeProduct);

export default productRouter;
