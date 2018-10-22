'use strict';

const nodemailer = require('nodemailer');
const Order = require('../models/order');
const User = require('../models/user');
const Local = require('../models/userAdmin');

//This method is by insert a array of object in data base
function insertOrder(req, res) {
    var vector = req.body.order;
    var userId = req.body.id_user;
    var name =  req.body.nameUser;
    var order = [];

    for (var i = 0; i < vector.length; i++) {
        order[i] = {
            name: vector[i].name,
            image: vector[i].image,
            notes: vector[i].notes,
            price: vector[i].price,
            drink: vector[i].drink,
            id_product: vector[i].id_product,
            id_local: vector[i].id_local,
            id_user: userId,
            nameUser: name
        }
    }

    Order.insertMany(order, function (err, or) {
        if (err) throw err;
        return res.status(200).send({ message: "now" })
    });
}

async function email(local, user, total, value) {
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail', // true for 465, false for other ports
            auth: {
                user: 'soport.restaurant@gmail.com', // generated ethereal user
                pass: 'fuegoloco2' // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: 'soport.restaurant@gmail.com', // sender address
            to: user, // list of receivers
            subject: 'Pedido de '+local, // Subject line
            text: 'Hello world', // plain text body
            html: '<p>Hola, gracias por tu pedido, su total a pagar es de: '+total+' </p>' // html body
        };

        if(value == 1){
            mailOptions.html = '<p>Hola, su pedido fue rechazado disculpe las molestias.</p>';
        }
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
}

function showOrder(req, res) {
    Order.find({}, (err, order) => {
        var idLocal = req.body.id_local;

        //console.log(order[0].signupDate);
        let json = [];
        var idUser = "";
        var sw = 0;
        var k = 0;
        if (err) {
            res.status(500).send({ message: err });
        }
        if (order.length != 0) {
            for (var i = 0; i < order.length; i++) {
                if (order[i].id_local == idLocal) {
                    idUser = order[i].id_user;
                    k = 0;
                    if (sw == 0 && order[i].activo == true) {
                        json[i] = {
                            idUser: []
                        }
                        json[i].idUser.push(order[i])
                        sw = 1;
                    } else {
                        for (var j = 0; j < json.length; j++) {
                            if (json[j].idUser[0].id_user == idUser && order[i].activo == true) {
                                json[j].idUser.push(order[i]);
                                k = 1;
                            }
                        }
                        if (k == 0 && order[i].activo == true) {
                            json[json.length] = {
                                idUser: []
                            }
                            json[json.length].idUser.push(order[i])
                        }
                    }
                }
            }
            res.status(200).send(json);
        }
    });
}

async function acceptOrder(req, res) {
    let json = {
        id_local: "",
        id_user: "",
        value: ""
    }

    json.id_local = req.body.id_local;
    json.id_user = req.body.id_user;
    json.value = req.body.value;

    var jsonUser = await User.findOne({_id: json.id_user});
    var jsonLocal = await Local.findOne({_id: json.id_local});
    var jsonOrder = await Order.find({id_user: json.id_user});
    var con = 0;

    for(var i = 0; i<jsonOrder.length; i++){
        if(jsonOrder[i].id_local == json.id_local && jsonOrder[i].activo == true){
            con = con + jsonOrder[i].price;
        }
    }

    email(jsonLocal.name, jsonUser.email, con, json.value);

    res.status(200).send({message: 'Se ha enviado el mensaje'});
}

module.exports = {
    insertOrder,
    acceptOrder,
    showOrder
};

