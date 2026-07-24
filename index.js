const express = require("express");
const dbMiddleware = require("./Middlewares/dbMiddleware");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./Models/db");
app.use(dbMiddleware); 
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const ModuleRouter = require("./Routes/ModuleRouter");
const QuestionRouter = require("./Routes/QuestionRouter");
const PreviewRouter = require("./Routes/PreviewRouter");

const app = express();


// CORS - allow any frontend
app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


// Handle preflight requests
app.options("*", cors());


// Body parser
app.use(bodyParser.json());


// Connect database before routes
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed:", error.message);

        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message
        });
    }
});


// Logger
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});


// Test routes
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running successfully"
    });
});


app.get("/ping", (req, res) => {
    res.send("PONG");
});
app.get("/db-test", async (req, res) => {
    try {
        await connectDB();

        res.json({
            success: true,
            message: "Database connected"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// API Routes
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/modules", ModuleRouter);
app.use("/questions", QuestionRouter);
app.use("/preview", PreviewRouter);


// Local development only
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}


module.exports = app;
