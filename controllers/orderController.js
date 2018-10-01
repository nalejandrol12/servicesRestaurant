'use strict';

const nodemailer = require('nodemailer');
const Order = require('../models/order');

//This method is by insert a array of object in data base
function insertOrder(req, res) {
    var order = req.body.order;

    Order.insertMany(order, function (err, or) {
        if (err) throw err;

        return res.status(200).send({ message: "now" })
    });
}

function email() {
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
            to: 'nalejandro12@outlook.es', // list of receivers
            subject: 'Hello', // Subject line
            text: 'Hello world', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

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

module.exports = {
    insertOrder,
    email
};

