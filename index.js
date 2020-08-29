const express = require('express')
const mongo = require('mongodb').MongoClient;
const cheerio = require('cheerio')
const fs = require('fs');
const app = express()

const db_url = "mongodb://localhost:27017/pathways"

app.use(express.static(__dirname + "/public"))
app.get("/", function(req, res) {
    let pathway_data;
    get_pathway_data("pathway_to_programmer", "Genergy7")
    .then((result) => {
        pathway_data = result
        let file = fs.readFileSync("./public/todos.html", "utf-8")
        if(file == undefined || file == null) throw "Failed to load a html file!"
        return file
    }).then((content) => {
        let $ = cheerio.load(content)
        for(let i=0; i < pathway_data[0].phases.length; i++) {
            let name = pathway_data[0].phases[i].name.toLowerCase().replace(/ /g,"-")
            add_phase($, name)
            for(let j=0; j < pathway_data[0].phases[0].todos.length; j++) {
                add_todo($, name, pathway_data[0].phases[0].todos[j])
            }
        }
        res.send($.html())
    }).catch((reason) => {
        console.log(`error occured: ${reason}`)
        res.status(503).send("<h1>Oops! something went wrong!</h1>")
    })
})

app.listen(3000, function() {
    console.log("Server running on port 3000")
})

function get_pathway_data(collection_name, username) {
    return new Promise((resolve, reject) => {
        mongo.connect(db_url, function(err, db) {
            if(err) reject(err);
            console.log("Connected to mongoDB");
            let dbo = db.db("pathways");
            dbo.collection(collection_name).find({creator_id:username}).toArray(function(err, res) {
                if(err) throw err
                if(res == undefined) reject("No such data exists")
                db.close()
                resolve(res)
            })
        })
    })
}

function add_phase(cheerio_cursor, phase_name) {
    cheerio_cursor("#phase-row").append(
        `<div id=phase-${phase_name}></div>`
    )
}

function add_todo(cheerio_cursor, phase_name, todo_bson) {
    cheerio_cursor(`#phase-${phase_name}`).append(
        `<div id=todo-${todo_bson.id} class="draggable todo">
            <div class="category_ribbon"></div>
            <div class="contents">
                <p class="title">${todo_bson.title}</p>
                <p class="subtitle">${todo_bson.subtitle}</p>
                <span class="xp">${todo_bson.xp}</span>
                <span class="xp-multiplier">${todo_bson.xp_multiplier}</span>
            </div>
        </div>`
    )
}