
const express = require('express');

// Import menu routes
const menuRoutes = require('./routes/menus');

// Import middleware functions
const {
    logger,
    notFound,
    errorHandler
} = require('./middleware');

// Initialize Express application
const app = express();

// Define server port
const PORT = 3000;

// Apply logger middleware to every request
app.use(logger);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount menu routes
app.use('/menus', menuRoutes);

// Welcome route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Modern Coffee Shop REST API!',
        student: 'Nabyl Jawahir',
        theme: 'Modern Coffee Shop',
        status: 'Server is running'
    });
});

// Wildcard route
app.get('/files/*path', (req, res) => {
    const filePath = req.params.path;

    res.status(200).json({
        success: true,
        message: 'Wildcard route accessed successfully',
        path: filePath
    });
});

// Handle unknown routes
app.use(notFound);

// Centralized error handler (must be last)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Coffee Shop API is running on http://localhost:${PORT}`);
});
