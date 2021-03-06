'use strict'

const express = require('express');
const userCtrl = require('../controllers/userController');
const localCtrl = require('../controllers/localController');
const adminCtrl = require('../controllers/userAdminController');
const menuCtrl = require('../controllers/menuController');
const orderCtrl = require('../controllers/orderController');
const imageCtrl = require('../controllers/imageController');
const auth = require('../middlewares/auth');
const api = express.Router();

//URL PRODUCT

api.post('/menu', menuCtrl.createMenu);

api.get('/product/:id_local', menuCtrl.getProduct);

api.post('/order', orderCtrl.insertOrder);

api.post('/email', orderCtrl.acceptOrder);

api.post('/showOrder', orderCtrl.showOrder);

//URL APP
api.post('/signup', userCtrl.signUp);

api.post('/signin', userCtrl.signIn);

api.get('/private', auth, (req, res) => {
    res.status(200).json([{message: 'Tienes acceso'}])
});

api.get('/local', localCtrl.getAll);

api.get('/name/:name', menuCtrl.getName);

api.get('/name2/:name', menuCtrl.getName2);

api.post('/createMenu', menuCtrl.createMenu);

api.post('/deleteMenu', menuCtrl.deleteProduct);

//URL ADMIN

api.post('/signupadmin', adminCtrl.signUpAdmin);

api.post('/signinadmin', adminCtrl.signInAdmin);


//URL image
api.post('/saveImage', imageCtrl.saveImage);

api.post('/deleteImage', imageCtrl.deleteImage);



//Recordar agregar el campo id_empresa a la tabla producto
module.exports = api

