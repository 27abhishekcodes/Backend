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
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/modules', moduleRouter);
app.use('/questions', questionRouter);
app.use('/preview', previewRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

module.exports = app;