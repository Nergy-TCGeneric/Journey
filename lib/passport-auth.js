const passport = require('passport')
const local_auth = require('passport-local').Strategy
const bcrypt = require('bcrypt')

var userDB = undefined

passport.use(new local_auth({
    usernameField: "id",
    passwordField: "pwd"
}, function(id, pwd, done) {
    if(userDB === undefined) throw "Database not initialized properly"
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

module.exports = {
    auth_module: passport,
    init: function(db) { userDB = db }
}