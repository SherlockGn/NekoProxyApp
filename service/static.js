const express = require('express')

const { port } = require('../config.json')

const static = (req, res, next) => {
    if (port !== req.socket.address().port) {
        next()
        return
    }

    express.static(__dirname + '/../frontend/dist')(req, res, next)
}

module.exports = {
    static
}
