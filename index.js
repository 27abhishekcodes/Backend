const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const dbMiddleware = require("./Middlewares/dbMiddleware");

const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const ModuleRouter = require("./Routes/ModuleRouter");
const QuestionRouter = require("./Routes/QuestionRouter");
const PreviewRouter = require("./Routes/PreviewRouter");

const app = express();

// CORS
app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

// Body parser
app.use(bodyParser.json());

// Logger
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Health check routes (do not require database)
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Backend is running successfully"
    });
});

app.get("/ping", (req, res) => {
    res.send("PONG");
});

// Database middleware
app.use(dbMiddleware);

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
