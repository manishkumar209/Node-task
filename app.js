// const mongoose = require('mongoose');
import mongoose from 'mongoose';
var express = require('express');
var bodyParser = require('body-parser');
import indexRoute from './route/index';
var app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Expires, Authorization, Accept, Cache-Control, Pragma");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
})
app.use(bodyParser.json())

const port = process.env.PORT || 3001;

// connect to database
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/productDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', indexRoute);
app.get('/', (req, res) => {
    return res.end('Task API testing : it is working ---');
})
// catch 404
app.use((req, res, next) => {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});
app.listen(port, () => {
    console.log(`App Server Listening at ${port}`);
});