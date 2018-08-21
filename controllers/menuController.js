'use strict';

const Menu = require('../models/menu');

async function createMenu(req, res) {
    let menu = new Menu();
    menu.name = req.body.name;
    menu.description = req.body.description;
    menu.category = req.body.category;
    menu.quantity = req.body.quantity;
    menu.id_local = req.body.id_local;

    menu.save((err, menuStored) => {
        if (err) res.status(500).send({ message: `Error al salvar la base de datos: ${err}` })

        res.status(200).send({ product: menuStored });
    })
}

async function getProduct(req, res) {
    let productId = req.params.id_local;

    Menu.find({id_local: productId}, (err, product) => {
        if (err)
            return res.status(500).send({ message: `Error al hacer la peticion al servidor: ${err}` });

        if (!product)
            return res.status(404).send({ message: `El producto no existe` })

        res.status(200).send(product);
    })
}

module.exports = {
    createMenu,
    getProduct
}