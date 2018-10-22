'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    notes: { type: String, required: false },
    price: { type: Number, required: true },
    drink: { type: String, required: false },
    id_product: { type: String, required: true },
    id_local: { type: String, required: true },
    id_user: { type: String, required: true },
    nameUser: { type: String, required: true },
    activo: { type: Boolean, default: true },
    signupDate: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Order', OrderSchema);