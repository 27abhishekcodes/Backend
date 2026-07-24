const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Already connected
        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB already connected");
            return;
        }

        console.log("Before connect:", mongoose.connection.readyState);

        await mongoose.connect(
            "mongodb+srv://abhishek_1234:abhishek1234@cluster0.nj7buny.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
        );

        console.log("After connect:", mongoose.connection.readyState);
        console.log("Connected to:", mongoose.connection.host);

    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        throw error;
    }
};

module.exports = connectDB;
