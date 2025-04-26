import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: { type: Number, required: true },
        }
    ],
    total: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending', // Other values: Shipped, Delivered, Cancelled
    },
    deliveryOption: {
        type: String,
        enum: ['standard', 'emergency'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Order = mongoose.model('Order', orderSchema);
export { Order };