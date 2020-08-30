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
    edit.addEventListener("click", function() {showEditModal(id)})
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

function showEditModal(id) {
    let todo = document.getElementById(id)
    let modal = document.getElementById("edit-modal")
    modal.style.display = "block"
    let close = modal.querySelector(".cancel")
    close.addEventListener("click", function() {
        modal.style.display = "none"
    })
    let inputs = modal.querySelectorAll("input")
    inputs[0].value = todo.querySelector(".title").firstChild.textContent
    inputs[1].value = todo.querySelector(".subtitle").firstChild.textContent
}

function showDeletebox(id) {

}

function completeTodo(id) {
    let todo = document.getElementById(id)
    todo.toggleAttribute("completed")
    // TODO: Send PUT request here
}