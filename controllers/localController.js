'use strict';

const Local = require('../models/userAdmin');
const services = require('../services/index');

//method is by get all the local
function getAll(req, res) {
    Local.find({}, (err, local) => {

        if (err) {
            return res.status(500).send({
                message: `Error al realizar la petición: ${err}`
            });
        }

        if (!local) {
            return res.status(404).send({
                message: 'No existen locales'
            });
        } else {
            return res.status(200).send(local);
        }
    })
}

module.exports = {
    getAll
}