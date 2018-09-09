'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json([{message: 'Unauthorized request'}])
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).json([{message: 'Unauthorized request'}])
    }
    let payload = jwt.verify(token, config.SECRET_TOKEN)
    if (!payload) {
        return res.status(401).json([{message: 'Unauthorized request'}])
    }
    req.user = payload.subject
    next()
}

module.exports = verifyToken