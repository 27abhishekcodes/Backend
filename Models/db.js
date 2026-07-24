const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_CONN;

console.log("Mongo URL exists:", !!mongo_url);

mongoose.connect(mongo_url)
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
    });
