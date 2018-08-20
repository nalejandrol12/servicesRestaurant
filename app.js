'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const api = require('./routes/indexRoute');
const cors = require('cors')
const morgan = require('morgan');

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(morgan('dev'));

//import by to access to the images
app.use(express.static('public'));

//Route images
app.use('/api/images', express.static(__dirname + '/images'));

app.use(bodyParser.json());

app.use('/api', api);

//Use the function for get data of the header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept', 'application/json', 'text/json');

    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

//app.use(express.static(path.join(__dirname, 'dist')));

/*app.use('*', function (req, res){
    res.sendFile(path.join(__dirname, '/index.html'));
});*/


module.exports = app
