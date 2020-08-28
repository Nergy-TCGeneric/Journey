// First, draw some draggable elements, then connect them with lines
let express = require('express')
let fs = require('fs')
let app = express()

app.use(express.static(__dirname + "/public"))
app.get("/", function(req, res) {
    fs.readFile("index.html", "utf-8", function(err, content) {
        res.send(content)
    })
})

app.listen(3000, function() {
    console.log("Server running on port 3000")
})