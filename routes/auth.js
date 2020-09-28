const express = require('express')
const db_manager = require('../lib/db-manage.js')
const router = express.Router()
const config = require('../config.json')
const fs = require('fs')
var passport = require('passport') // For default settings
var userDB = undefined

router.use(express.urlencoded({extended: false}))

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
    // res.send("Registeration page")
    fs.readFile("./Journey/public/register.html", "utf-8", function(err, content) {
        if(err) throw err
        res.end(content)
    })
})

router.post('/register', function(req, res) {
    if(!req.body) return res.redirect("/")
    let conn = db_manager.createConnection(config.db_url)
    db_manager.createUser(conn, {
        id: req.body.id,
        password: req.body.pwd
    })
    console.log(req.body)
    res.end()
})

module.exports = { 
    router: router,
    init: function(db, passport_module) { 
        userDB = db
        passport = passport_module
    }
}