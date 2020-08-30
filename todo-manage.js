const db_url = "mongodb://localhost:27017/pathways"
const mongo = require('mongodb').MongoClient;

export function add_phase(cheerio_cursor, phase_name) {
    cheerio_cursor("#phase-row").append(
        `<div id=phase-${phase_name}></div>`
    );
}
export function get_pathway_data(collection_name, username) {
    return new Promise((resolve, reject) => {
        mongo.connect(db_url, function (err, db) {
            if (err)
                reject(err);
            console.log("Connected to mongoDB");
            let dbo = db.db("pathways");
            dbo.collection(collection_name).find({ creator_id: username }).toArray(function (err, res) {
                if (err)
                    throw err;
                if (res == undefined)
                    reject("No such data exists");
                db.close();
                resolve(res);
            });
        });
    });
}

export function add_todo(cheerio_cursor, phase_name, todo_bson) {
    let completed = todo_bson.isCompleted ? "completed" : ""
    cheerio_cursor(`#phase-${phase_name}`).append(
        `<div id=todo-${todo_bson.id} class="draggable todo" ${completed}>
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