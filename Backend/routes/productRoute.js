import express from 'express';
import upload from '../middleware/multer.js';
import { addProduct, listProduct, removeProduct, singleProduct } from '../controller/productController.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

productRouter.post('/add', adminAuth, upload.none(), addProduct);

productRouter.get('/list', listProduct);

productRouter.get('/single/:productId', singleProduct);

productRouter.post('/remove', adminAuth, removeProduct);

export default productRouter;
