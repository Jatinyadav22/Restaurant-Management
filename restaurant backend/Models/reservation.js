const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    tableNumber: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    specialRequests: { type: String },
    status: { type: String, default: 'Pending' }  
});

module.exports = mongoose.model('Reservation', reservationSchema);
