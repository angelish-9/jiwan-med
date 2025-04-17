import express from 'express';
import upload from '../middleware/multer.js';
import { addProduct, listProduct, removeProduct, editProduct, singleProduct, categoryProduct } from '../controller/productController.js';

import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// productRouter.post('/add', adminAuth, upload.single(), addProduct);
productRouter.post('/add', adminAuth, upload.single('image'), addProduct);

productRouter.get('/list', listProduct);

productRouter.get('/single/:productId', singleProduct);

productRouter.post('/remove', adminAuth, removeProduct);

productRouter.get('/list/:category',categoryProduct);

productRouter.put('/admin/update/:id', adminAuth, upload.single('image'), editProduct);

export default productRouter;
