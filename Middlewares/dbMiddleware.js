const connectDB = require("../Models/db");

const dbMiddleware = async (req, res, next) => {
    try {
        console.log("DB middleware started");
        await connectDB();
        console.log("DB middleware finished");
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
