const express = require('express')
const router = express.Router()

const cheerio = require('cheerio')
const todo = require('../lib/todo-manage.js')
const fs = require('fs')

router.get("/:pathwayId", function(req, res) {
    let pathway_data;
    todo.get_pathway_data("pathway_to_programmer", "Genergy7")
    .then((result) => {
        pathway_data = result
        let file = fs.readFileSync("./Journey/public/todos.html", "utf-8")
        if(file == undefined || file == null) throw "Failed to load a html file!"
        return file
    }).then((content) => {
        let $ = cheerio.load(content)
        for(let i=0; i < pathway_data[0].phases.length; i++) {
            let name = pathway_data[0].phases[i].name.toLowerCase().replace(/ /g,"-")
            todo.add_phase($, name)
            for(let j=0; j < pathway_data[0].phases[0].todos.length; j++) {
                todo.add_todo($, name, pathway_data[0].phases[0].todos[j])
            }
        }
        res.send($.html())
    }).catch((reason) => {
        console.log(`error occured: ${reason}`)
        res.status(503).send("<h1>Oops! something went wrong!</h1>")
    })
})

router.post("/:pathwayId/create", function(req, res) {

})

router.post("/:pathwayId/edit/:todoId", function(req, res) {

})

module.exports = router