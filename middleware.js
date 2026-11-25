
// Logger Middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
};

// Authentication Middleware
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization;

    const validToken = 'coffee-shop-secret';

    if (token !== `Bearer ${validToken}`) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid or missing authentication token'
        });
    }

    next();
};

// Not Found Middleware
const notFound = (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;

    next(error);
};

// Centralized Error Handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

// Export middleware functions
module.exports = {
    logger,
    requireAuth,
    notFound,
    errorHandler
};
