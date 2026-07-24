const connectDB = require("../Models/db");

const dbMiddleware = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("Database connection failed:", err.message);

        return res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: err.message
        });
    }
};

module.exports = dbMiddleware;
