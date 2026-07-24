const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Database
require("./Models/db");

// Routes
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const ModuleRouter = require("./Routes/ModuleRouter");
const QuestionRouter = require("./Routes/QuestionRouter");
const PreviewRouter = require("./Routes/PreviewRouter");

// CORS
const corsOptions = {
    origin: "https://frontend-ten-blush-34.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Test Route
app.get("/ping", (req, res) => {
    res.send("PONG");
});

// Routes
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/modules", ModuleRouter);
app.use("/questions", QuestionRouter);
app.use("/preview", PreviewRouter);

// Root Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running successfully"
    });
});

app.post("/test", (req, res) => {
    res.json({
        success: true,
        message: "POST is working"
    });
});

// Start server only for local development
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
