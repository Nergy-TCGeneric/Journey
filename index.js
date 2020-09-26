const express = require('express')
const fs = require('fs')
const auth_router = require('./routes/auth.js')
const pathway_router = require('./routes/pathways.js')
const app = express()
const port = 3000

app.use(express.static(__dirname + "/Journey/public"))
app.use(express.urlencoded({extended: false}))
app.use("/auth", auth_router)
app.use("/pathways", pathway_router)

// Avaliable specific routes are: /auth, /pathways 
app.get("/", function(req, res) {
    fs.readFile("./Journey/public/mainpage.html", (err, data) => {
        if(err) throw err
        res.end(data)
    })
})

app.listen(port, function() {
    console.log(`Server running on port ${port}`)
})