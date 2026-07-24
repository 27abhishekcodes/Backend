const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        console.log("MONGO_CONN exists:", !!process.env.MONGO_CONN);
        console.log("Before connect:", mongoose.connection.readyState);
        const connection = await mongoose.connect(
  "mongodb+srv://abhishek_1234:Abhishek1234@cluster0.nj7buny.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
        );

        console.log("After connect:", mongoose.connection.readyState);
console.log("Connected to:", connection.connection.host);

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
