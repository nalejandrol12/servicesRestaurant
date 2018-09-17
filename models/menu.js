'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    drink: { type: String, required: true },
    id_local: { type: String, required: true },
    name_local: { type: String, required: true},
    address_local: { type: String, required: true},
    time: { type: Number, required: true}
});

module.exports = mongoose.model('Menu', MenuSchema);