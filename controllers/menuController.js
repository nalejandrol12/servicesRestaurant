'use strict';

const Menu = require('../models/menu');

async function createMenu(req, res) {
    let menu = new Menu();
    menu.name = req.body.name;
    menu.description = req.body.description;
    menu.category = req.body.category;
    menu.quantity = req.body.quantity;
    menu.price = req.body.price;
    menu.image = req.body.image;
    if (menu.category === 'COMBOS') {
        menu.drink = req.body.drink;
    } else {
        menu.drink = 'null';
    }
    menu.id_local = req.body.id_local;

    await menu.save((err, menuStored) => {
        if (err) res.status(500).send({ message: `Error al salvar la base de datos: ${err}` })

        res.status(200).send({ product: menuStored });
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

module.exports = {
    createMenu,
    getProduct
}