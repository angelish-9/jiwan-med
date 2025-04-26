import { Cart } from '../models/Cart.js';
import { Product }from '../models/Product.js';


export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id; 

        
        console.log("Incoming data:", { productId, quantity });

        
        if (!productId || !quantity) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            
            cart = new Cart({ userId, items: [] });
        }

        
        const existingItemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (existingItemIndex !== -1) {
            
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            
            cart.items.push({ productId, quantity });
        }

        
        console.log("Cart before saving:", cart);

        
        await cart.save();

        
        res.status(200).json({ success: true, message: 'Product added to cart', cart });
    } catch (err) {
        console.error("Error occurred:", err); 
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const getCart = async (req, res) => {
    try {
        const userId = req.user._id; 

        
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        

        res.status(200).json({ success: true, cart });
    } catch (err) {
        console.error("Error occurred:", err); 
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        
        console.log('Removing item from cart:', { userId, productId });

        
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        
        cart.items = cart.items.filter(
            (item) =>
                item.productId._id.toString() !== productId
        );

        
        await cart.save();

        
        await cart.populate('items.productId');

        
        const totalItems = cart.items.length;
        const totalPrice = cart.items.reduce((acc, item) => {
            const price = item.productId?.price || 0;
            return acc + price * item.quantity;
        }, 0);

        res.status(200).json({
            success: true,
            message: 'Item removed from cart',
            cart,
            totalItems,
            totalPrice,
        });
    } catch (err) {
        console.error('Error removing item from cart:', err);
        res.status(500).json({
            success: false,
            message: 'Server error while removing item from cart',
        });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { id, quantity } = req.body; // itemId and newQuantity
        const userId = req.user._id;

        if (!id || !quantity) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Find the cart for the user
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        // Find the cart item by id and update its quantity
        const itemIndex = cart.items.findIndex(item => item._id.toString() === id);
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }

        // Update the quantity
        cart.items[itemIndex].quantity = quantity;

        // Save the updated cart
        await cart.save();

        // Recalculate the total price (optional)
        const totalPrice = cart.items.reduce((acc, item) => {
            const price = item.productId?.price || 0;
            return acc + price * item.quantity;
        }, 0);

        res.status(200).json({
            success: true,
            message: 'Cart updated successfully',
            cart,
            totalPrice,
        });
    } catch (err) {
        console.error('Error updating cart:', err);
        res.status(500).json({
            success: false,
            message: 'Server error while updating cart',
        });
    }
};
