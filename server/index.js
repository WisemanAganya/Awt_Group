const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config({ path: '../.env' }); // Load from root .env if possible, or local

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'AWT Group Server is running' });
});

const authRoutes = require('./routes/authRoutes');
const { router: adminRoutes } = require('./routes/adminRoutes');
const heroRoutes = require('./routes/heroRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/hero', heroRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
