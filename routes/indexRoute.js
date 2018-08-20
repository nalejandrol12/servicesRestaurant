'use strict'

const express = require('express');
const userCtrl = require('../controllers/userController');
const localCtrl = require('../controllers/localController');
const adminCtrl = require('../controllers/userAdminController');
const auth = require('../middlewares/auth');
const api = express.Router();

//URL APP
api.post('/signup', userCtrl.signUp);

api.post('/signin', userCtrl.signIn);

api.get('/private', auth, (req, res) => {
    res.status(200).json([{message: 'Tienes acceso'}])
});

api.get('/local', localCtrl.getAll);

//URL ADMIN

api.post('/signupadmin', adminCtrl.signUpAdmin);

api.post('/signinadmin', adminCtrl.signInAdmin);


//Recordar agregar el campo id_empresa a la tabla producto
module.exports = api

