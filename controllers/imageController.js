'use strict';

//Import of all the files required
const formidable = require('formidable');
const fs = require('fs');

//Method to save the image
function saveImage(req, res) {
    //parse a file uploadnp
    var form = new formidable.IncomingForm();
    form.uploadDir = "./images";
    form.keepExtensions = true;
    form.maxFieldsSize = 10 * 1024 * 1024; //10 MB
    form.multiples = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({
                result: "failed",
                data: {},
                message: `Cannot upload audios.Error is : ${err}`
            });
        }
        var arrayOfFiles = [];
        if (files["name"] instanceof Array) {
            arrayOfFiles = files["name"];
        } else {
            if (Object.keys(files).length != 0) {
                arrayOfFiles.push(files["name"]);
                var route = files["name"].path;
                res.json({
                    result: "ok",
                    data: route.split('\\')[1],
                    message: "Upload image successfully"
                });
                return "Delete image";
            } else {
                res.json({
                    result: "failed",
                    data: {},
                    message: "No image to upload !"
                });
            }
        };
    });
}

function deleteImage(req, res) {
    var filePath = "./images/";
    filePath += req.body.name;
    fs.exists(filePath, function (exists) {
        if (exists) {
            fs.unlinkSync(filePath);
            res.status(200).send({
                message: "Se elimino con exito",
                number: 1
            })
        } else {
            res.status(200).send({
                message: "No existia un archivo",
                number: 0
            })
        }
    });
}

module.exports = {
    saveImage,
    deleteImage
}