const express = require('express')
const router = express.Router()
const fs = require('fs')
var passport = require('passport') // For default settings
var userDB = undefined

router.get('/', function(req, res) {
    res.redirect(301, '/auth/login')
})

router.get('/login', function(req, res) {
    fs.readFile("./Journey/public/login.html", "utf-8", function(err, content) {
        res.send(content)
    })
})

router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        res.redirect("../pathways")
    }
)

router.get('/register', function(req, res) {
    res.send("Registeration page")
})

module.exports = { 
    router: router,
    init: function(db, passport_module) { 
        userDB = db
        passport = passport_module
    }
}