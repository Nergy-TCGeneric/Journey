const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', function(req, res) {
    res.redirect(301, '/auth/login')
})

router.get('/login', function(req, res) {
    fs.readFile("./Journey/public/login.html", "utf-8", function(err, content) {
        res.send(content)
    })
})

router.get('/register', function(req, res) {
    res.send("Registeration page")
})

module.exports = router