const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orderRoutes');
const reservationRoutes = require('./routes/reservations'); // ✅ NEW

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Existing order routes
app.use('/api/orders', orderRoutes);

// ✅ New reservation routes
app.use('/api/reservations', reservationRoutes);
app.post('/api/reservations', async (req, res) => {
  const { tableNumber, name, email, date, time, guests, specialRequests } = req.body;

  try {
    await db.collection('reservations').insertOne({
      tableNo: tableNumber, 
      name,
      email,
      date,
      time,
      guests,
      specialRequests,
      status: 'Pending', 
      createdAt: new Date()
    });

// Add this route to send reservations to Reserved.html
app.get('/api/reservations', async (req, res) => {
    try {
        const reservations = await reservationCollection.find().toArray();
        res.json(reservations);
    } catch (err) {
        console.error("Error fetching reservations:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


    res.status(201).json({ message: 'Reservation saved successfully' });
  } catch (error) {
    console.error('Error inserting reservation:', error);
    res.status(500).json({ error: 'Failed to save reservation' });
  }
});


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected');

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () =>
            console.log(`🚀 Server running on http://localhost:${PORT}`)
        );
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); 
    });
