import express from 'express'
import { Order } from '../models/Order.js'
import { Cart } from '../models/Cart.js'
import { verifyToken } from '../middleware/authMiddleware.js'
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router()


orderRouter.get('/my', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.productId').sort({ createdAt: -1 });
        res.json({ orders });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders.' });
    }
});

orderRouter.post('/place', verifyToken, async (req, res) => {
    const { items, total, address, phone } = req.body;

    if (!items || !total || !address || !phone) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const order = new Order({
            user: req.user._id,
            items,
            total,
            address,
            phone,
        });

        await order.save();

        const updatedCart = await Cart.findOneAndUpdate(
            { userId: req.user._id },
            { $set: { items: [] } },
            { new: true }
        );

        if (!updatedCart) {
            console.warn(`Cart not found for user: ${req.user._id}`);
        }

        res.status(201).json({ message: 'Order placed successfully!', order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong.' });
    }
});


orderRouter.get('/all', adminAuth, async (req, res) => {
    try {

        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.productId')
            .sort({ createdAt: -1 });

        res.json({ orders });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch all orders.' });
    }
});

orderRouter.put('/:id/status', adminAuth, async (req, res) => {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Shipped', 'Delivered', 'Canceled'];

    // Check if the status is valid
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update the order status
        order.status = status;
        await order.save();

        return res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

export default orderRouter