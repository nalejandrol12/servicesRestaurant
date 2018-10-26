'use strict';

const Menu = require('../models/menu');
const User = require('../models/userAdmin');

async function createMenu(req, res) {

    let menu = new Menu();
    var image = "";
    if(req.body.image == ""){
        image = "default2.jpg"
    } else {
        image = req.body.image;
    }

    menu.name = req.body._body.name;
    menu.description = req.body._body.description;
    menu.category = req.body._body.category;
    menu.quantity = Number(req.body._body.quantity);
    menu.price = Number(req.body._body.price);
    menu.image = image;
    menu.time = 6;

    if (menu.category === 'COMBOS') {
        menu.drink = req.body._body.drink;
    } else {
        menu.drink = 'null';
    }
    menu.id_local = req.body.id_local;

    var object = await User.findOne({_id: req.body.id_local});

    menu.name_local = object.name;

    menu.address_local = object.address;

    await menu.save((err, menuStored) => {
        if (err) res.status(500).send({ message: `Error al salvar la base de datos: ${err}` })

        res.status(200).send({ message: "Éxito" });
    })
}

function getProduct(req, res) {
    let productId = req.params.id_local;
    var data = [];
    Menu.find({ id_local: productId }, (err, product) => {
        if (err)
            return res.status(500).send({ message: `Error al hacer la peticion al servidor: ${err}` });

        if (!product)
            return res.status(404).send({ message: `El producto no existe` })

        for (var i = 0; i < product.length; i++) {
            data[i] = {
                "_id": product[i]._id,
                "name": product[i].name,
                "description": product[i].description,
                "category": product[i].category,
                "quantity": product[i].quantity,
                "price": product[i].price,
                "image": product[i].image,
                "drink": product[i].drink.split("|"),
                "id_local": product[i].id_local
            }
        }
        res.status(200).send(data);
    })
}

function getName(req, res) {
    let name = req.params.name;
    var data = [];
    var time = {
        "amigo mio": 8,
        "cafeteria IUE": 4,
        "La Pepiada": 6
    }
    var sum;
    Menu.find({ name: {'$regex': '^'+name+'$',$options:'i'} }, (err, product) => {
        if (err)
            return res.status(500).send({ message: `Error al hacer la peticion al servidor: ${err}` });

        if (!product)
            return res.status(404).send({ message: `El producto no existe` })

        for (var i = 0; i < product.length; i++) {

            sum = time[product[i].name_local] + product[i].time;

            data[i] = {
                "_id": product[i]._id,
                "name": product[i].name,
                "description": product[i].description,
                "category": product[i].category,
                "quantity": product[i].quantity,
                "price": product[i].price,
                "image": product[i].image,
                "drink": product[i].drink.split("|"),
                "id_local": product[i].id_local,
                "name_local": product[i].name_local,
                "address_local": product[i].address_local,
                "time_arrival": time[product[i].name_local],
                "preparation_time": product[i].time,
                "total_time": sum 
            };

        }

        data.sort(function (a, b) {
            return (a.price - b.price)
        });

        res.status(200).send(data);
    })
}

function getName2(req, res) {
    let name = req.params.name;
    var data = [];
    var time = {
        "amigo mio": 8,
        "cafeteria IUE": 4,
        "La Pepiada": 6
    }
    var sum;
    Menu.find({ name: {'$regex': '^'+name+'$',$options:'i'} }, (err, product) => {
        if (err)
            return res.status(500).send({ message: `Error al hacer la peticion al servidor: ${err}` });

        if (!product)
            return res.status(404).send({ message: `El producto no existe` })

        for (var i = 0; i < product.length; i++) {

            sum = time[product[i].name_local] + product[i].time;

            data[i] = {
                "_id": product[i]._id,
                "name": product[i].name,
                "description": product[i].description,
                "category": product[i].category,
                "quantity": product[i].quantity,
                "price": product[i].price,
                "image": product[i].image,
                "drink": product[i].drink.split("|"),
                "id_local": product[i].id_local,
                "name_local": product[i].name_local,
                "address_local": product[i].address_local,
                "time_arrival": time[product[i].name_local],
                "preparation_time": product[i].time,
                "total_time": sum 
            };

        }

        data.sort(function (a, b) {
            return (a.time - b.time)
        });

        res.status(200).send(data);
    })
}


module.exports = {
    createMenu,
    getProduct,
    getName,
    getName2
}