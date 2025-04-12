import express from 'express'
import { addToCart, getCart, removeFromCart, updateCart } from '../controller/cartController.js'
import {verifyToken} from '../middleware/authMiddleware.js'

const cartRouter = express.Router()

cartRouter.post('/get', verifyToken, getCart)
cartRouter.post('/add', verifyToken, addToCart)
cartRouter.post('/update', verifyToken, updateCart)
cartRouter.post('/remove', verifyToken, removeFromCart)

export default cartRouter