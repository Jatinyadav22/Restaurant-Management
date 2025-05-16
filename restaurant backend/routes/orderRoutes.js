const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// POST /api/orders - Save a new order
router.post('/', async (req, res) => {
    try {
        console.log('📥 Incoming order data:', req.body); // Debug: log the incoming data

        const newOrder = new Order(req.body);
        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully!' });
    } catch (error) {
        console.error('❌ Error saving order:', error.message); // Show the error message
        res.status(500).json({ message: 'Failed to place order', error: error.message });
    }
});

// GET /api/orders - Fetch all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('❌ Error fetching orders:', error.message);
        res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
    }
});

module.exports = router;
