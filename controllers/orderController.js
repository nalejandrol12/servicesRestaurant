'use strict';

const Order = require('../models/order');

//This method is by insert a array of object in data base
function insertOrder(req, res){
    var order = req.body.order;

    Order.insertMany(order, function(err, or) {
        if (err) throw err;

        return res.status(200).send({message: "now"})
    });  
}

module.exports = {
    insertOrder
};

