import express from 'express';
import { Order } from '../models/Order.js';
import { Cart } from '../models/Cart.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import adminAuth from '../middleware/adminAuth.js';
import nodemailer from 'nodemailer'; // To send email

const orderRouter = express.Router();

// Add your order place route here
orderRouter.post('/place', verifyToken, async (req, res) => {
    const { items, total, address, phone, deliveryOption } = req.body;

    if (!items || !total || !address || !phone || !deliveryOption) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const order = new Order({
            user: req.user._id,
            items,
            total,
            address,
            phone,
            deliveryOption, // Add deliveryOption to the order
        });

        await order.save();

        // If the delivery option is 'emergency', send an email to the admin
        if (deliveryOption === 'emergency') {
            // Send an email to the admin (you can replace this with actual admin email logic)
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'bajracharya.alish587@gmail.com', // Your email
                    pass: 'admin', // Your email password or app password
                },
            });

            const mailOptions = {
                from: 'your-email@gmail.com',
                to: 'admin-email@example.com', // Admin email to receive notifications
                subject: 'New Emergency Order Placed',
                text: `A new emergency order has been placed with the following details:
                    Order ID: ${order._id}
                    User: ${req.user._id}
                    Delivery Address: ${address}
                    Phone Number: ${phone}
                    Total: ₹${total.toFixed(2)}
                    Delivery Option: Emergency`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }

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

export default orderRouter;
