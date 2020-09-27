const express = require('express')
const fs = require('fs')
const session = require('express-session')
const mongoose = require('mongoose')

const auth_router = require('./routes/auth.js')
const pathway_router = require('./routes/pathways.js')
const secret = require('./lib/auth-secret.json')
const passport = require('./lib/passport-auth.js')
const config = require('./config.json')

const MongoStore = require('connect-mongo')(session)
const userDB = mongoose.createConnection("mongodb://localhost:27017", { useNewUrlParser:true, useUnifiedTopology:true })
const app = express()

passport.init(userDB)
auth_router.init(userDB, passport.auth_module)
app.use(session({
    secret: secret["session_secret"],
    saveUninitialized: true,
    resave: true,
    store:new MongoStore({
        mongooseConnection: userDB.useDb("journey_users")
    })
}))
app.use(passport.auth_module.initialize())
app.use(passport.auth_module.session())

app.use(express.static(__dirname + "/Journey/public"))
app.use(express.urlencoded({extended: false}))
app.use("/auth", auth_router.router)
app.use("/pathways", pathway_router)

// Avaliable specific routes are: /auth, /pathways 
app.get("/", function(req, res) {
    fs.readFile("./Journey/public/mainpage.html", (err, data) => {
        if(err) throw err
        res.end(data)
    })
})

app.listen(config["port"], function() {
    console.log(`Server running on port ${config["port"]}`)
})