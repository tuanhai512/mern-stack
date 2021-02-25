const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/error');

app.use(express.json());

//import all routes
const products = require('./routes/products');

app.use('/api/v1', products);

//Middleware
app.use(errorMiddleware);

module.exports = app;