const express = require('express');
const router = express.Router();
const Reservation = require('../Models/Reservation');

router.post('/', async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        res.status(201).json({ message: 'Reservation saved' });
    } catch (error) {
        console.error('Error saving reservation:', error);
        res.status(500).json({ error: 'Failed to save reservation' });
    }
});

router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reservations' });
    }
});

module.exports = router;
