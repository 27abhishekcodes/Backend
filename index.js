const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const moduleRouter = require('./Routes/ModuleRouter');
const questionRouter = require('./Routes/QuestionRouter');
const previewRouter = require('./Routes/PreviewRouter');

require('dotenv').config();

// cors + body parsing registered FIRST, before anything that could throw
// (like the DB connection below) — this guarantees every response,
// including error responses, carries the right CORS headers.
app.use(cors({
    origin: "https://frontend-pf1g10p36-27abhishekcodes-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(bodyParser.json());

try {
    require('./Models/db');
} catch (err) {
    console.error('Failed to initialize DB connection module:', err.message);
}

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/modules', moduleRouter);
app.use('/questions', questionRouter);
app.use('/preview', previewRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

module.exports = app;