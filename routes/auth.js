const express = require('express')
const passport = require('passport')
const session = require('express-session')
const mongoose = require('mongoose')
const mongo = require('connect-mongo')
const local_auth = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const router = express.Router()
const fs = require('fs')

const auth_secrets = require('../lib/auth-secret.json')
const MongoStore = mongo(session)
let userDB = mongoose.createConnection("mongodb://localhost:27017", { useNewUrlParser:true, useUnifiedTopology:true })

passport.use(new local_auth({
    usernameField: "id",
    passwordField: "pwd"
}, function(id, pwd, done) {
    userDB.useDb("journey_users").collection("normal_user").findOne({id:id, pwd:pwd}, function(err, result) {
        if(err) throw err
        if(result) done(null, result)
        else done("Not found", null)
    })
}))

passport.deserializeUser(function(id, done) {
   if(id) done(null, id)
   else done("Not found", null)
})

passport.serializeUser(function(user, done) {
    bcrypt.hash(user.pwd, 10, function(err, data) {
        if(err) throw err
        done(null, {
            id: user.id,
            pwd: data
        })
    })
})

router.use(express.urlencoded({extended: false}))
router.use(session({
    secret: auth_secrets["session_secret"],
    saveUninitialized: true,
    resave: true,
    store:new MongoStore({
        mongooseConnection: userDB.useDb("journey_users")
    })
}))
router.use(passport.initialize())
router.use(passport.session())

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

module.exports = router