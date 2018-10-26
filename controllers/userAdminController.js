'use strict';

const User = require('../models/userAdmin');
const service = require('../services');

//method registers admin
function signUpAdmin(req, res) {

    User.find({
        email: req.body._body.email
    })
        .exec()
        .then(user => {
            // Validate if the email already exists in the database
            // In case the registration process is successful, a token and a message are returned
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "El email ya existe"
                });
            } else {
                var image = "";
                if (req.body.image == "") {
                    image = "default.jpg"
                } else {
                    image = req.body.image;
                }

                var schedule = req.body._body.horaInicial;
                schedule += " " + req.body._body.horarioInicial + " - " + req.body._body.horaFinal + " " + req.body._body.horarioFinal;

                const user = new User({
                    name: req.body._body.name,
                    image: image,
                    schedule: schedule,
                    address: req.body._body.address,
                    phone: req.body._body.phone,
                    description: req.body._body.description,
                    email: req.body._body.email,
                    password: req.body._body.password
                });
                user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).send({
                            token: service.createToken(user),
                            id: user._id,
                            image: user.image
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({
                            message: `Error creating the user: ${err}`
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

//method login Admin
function signInAdmin(req, res) {
    User.findOne({
        email: req.body.email
    })
        .exec()
        .then(user => {
            //validates that the user is different from null, that is to say that the mail is valid
            if (!user) {
                return res.status(401).json({
                    message: "email invalid"
                });
            } else {
                // Compare the password, to decrypt it
                // This method is internal to the bcrypt library
                // If all the data is correct, it returns a message and the token that is called from the services folder
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (err) return err
                    if (isMatch) {
                        return res.status(200).send({
                            token: service.createToken(user),
                            id: user._id,
                            image: user.image
                        });
                    } else {
                        return res.status(401).json({
                            message: "Password is incorrect"
                        });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

module.exports = {
    signUpAdmin,
    signInAdmin
}