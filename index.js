const express = require('express')
const auth_router = require('./routes/auth.js')
const pathway_router = require('./routes/pathways.js')
const app = express()

app.use(express.static(__dirname + "/Journey/public"))
app.use("/auth", auth_router)
app.use("/pathways", pathway_router)

// Avaliable specific routes are: /auth, /pathways 
app.get("/", function(req, res) {
    res.send("Journey mainpage<br><a href='/auth/login'>login</a><br><a href='/pathways/32'>pathway example</a>")
})

app.listen(3000, function() {
    console.log("Server running on port 3000")
})