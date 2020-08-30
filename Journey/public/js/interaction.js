function toggleControlbox(clicked_id) {
    let clicked = document.getElementById(clicked_id)
    let controlbox = clicked.querySelector(".controlbox")
    if(controlbox != null) clicked.removeChild(controlbox)
    else clicked.appendChild(createControlbox(clicked_id))
}

function createControlbox(id) {
    let box = document.createElement("div")
    box.className = `controlbox`
    box.setAttribute("owner", id)
    let edit = document.createElement("i")
    edit.className = "fas fa-edit"
    edit.onclick = showEditbox()
    let del = document.createElement("i")
    del.className = "fas fa-trash-alt"
    del.onclick = showDeletebox(id)
    let done = document.createElement("i")
    done.className = "fas fa-check"
    done.addEventListener("click", function() {completeTodo(id) })
    box.appendChild(edit)
    box.appendChild(del)
    box.appendChild(done)
    return box
}

function showEditbox() {

}

function showDeletebox(id) {

}

function completeTodo(id) {
    let todo = document.getElementById(id)
    todo.toggleAttribute("completed")
    // TODO: Send PUT request here
}