// Middlewares/dbMiddleware.js
const connectDB = require("../Models/db");

module.exports = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: err.message
        });
    }
};
