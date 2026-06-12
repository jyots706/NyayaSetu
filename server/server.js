require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Route
app.get('/', (req, res) => {
    res.send('NyayaSetu API is running...');
});

// Import Routes
const authRoutes = require('./routes/auth');
const voiceRoutes = require('./routes/voice');
const translateRoutes = require('./routes/translate');
const legalRoutes = require('./routes/legal');
const documentsRoutes = require('./routes/documents');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/documents', documentsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
