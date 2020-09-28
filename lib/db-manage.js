const mongoose = require('mongoose')
const schemas = require('./schemas/journey_schemas.js')(mongoose)

module.exports = {
    _connection: null,
    createConnection: function(url) {
        if(!this._connection) this._connection = mongoose.createConnection(url, {useNewUrlParser: true, useUnifiedTopology: true})
        return this._connection
    },
    createUser: function(connection, user_ctx) {
        if(!connection) throw "Invalid connection object is given!" 
        let User = connection.model('User', schemas.user_schema)
        let newUser = new User({
            id: user_ctx.id,
            password: user_ctx.password,
            pathway_ids: [],
            last_login: new Date()
        })
        newUser.save(function(err) {
            if(err) throw err;
        })
    }
}