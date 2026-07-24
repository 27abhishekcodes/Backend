const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        console.log("MONGO_CONN exists:", !!process.env.MONGO_CONN);

        const connection = await mongoose.connect(
            "mongodb+srv://abhisheksh2709_db_user:Abhishekk@cluster0.nj7buny.mongodb.net/?test=Cluster0"
        );

        isConnected = true;

        console.log(
            "MongoDB Connected:",
            connection.connection.host
        );

    } catch (error) {
        console.error(
            "MongoDB Connection Error:",
            error.message
        );

        throw error;
    }
};

module.exports = connectDB;
