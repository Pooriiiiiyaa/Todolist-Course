const taskInput = document.getElementById("task-input")
const dateInput = document.getElementById("date-input")
const addButton = document.getElementById("add-button")
const editButton = document.getElementById("edit-button")
const alertMessage = document.getElementById("alert-message")
const tableBody = document.querySelector("tbody")
const deleteAllBtn = document.getElementById("delete-all-button")





let todos = JSON.parse(localStorage.getItem("todos")) || [] ;

const generateId = () => {
     return Math.round(Math.random() * Math.random() * Math.pow(10 , 12)).toString() ;
}


const saveToLocal = () => {
    return localStorage.setItem("todos" , JSON.stringify(todos)) ;
}


const showAlert = (message , type) => {
    alertMessage.innerHTML = "" ;
    const alert = document.createElement("p")
    alert.innerText = message ;
    alert.classList.add("alert")
    alert.classList.add(`alert-${type}`)
    alertMessage.append(alert)
    setTimeout(() => {
        alert.style.display = "none"
    }, 2000);
}

const showTable = () => {
    tableBody.innerHTML = ""
    if(!todos.length) {
        tableBody.innerHTML = `
            <tr><td colspan='4'>No Task Found!</td></tr>
        `
    }

    todos.forEach((todo) => {
        tableBody.innerHTML += `
            <tr>
                <td>${todo.task}</td>
                <td>${todo.date || "No Date!"}</td>
                <td>${todo.complated ? "Complated" : "Pennding"}</td>
                <td>
                    <button onClick="editHandler('${todo.id}')">Edit</button>
                    <button onClick="doHandler('${todo.id}')">${todo.complated ? "Undo" : "Do"}</button>
                    <button onClick="deleteHandler('${todo.id}')">Delete</button>
                </td>
            </tr>
        `
    })
}


const addHandler = () => {
    const task = taskInput.value ;
    const date = dateInput.value ;

    const todo = {
        id : generateId(),
        task : task ,
        date : date ,
        complated : false
    }

    if(task){
        todos.push(todo)
        showAlert("Todo Add Successfully" , "success");
        saveToLocal() ;
        showTable() ;
    }else {
        showAlert("Please Enter Task!" , "error")
    }
    taskInput.value = ""
    dateInput.value = ""
    console.log(todos);
}


const deleteAllHandler = () => {
    if(!todos.length){
        showAlert("All Todo Deleted!!!" , "error")
    }else {
        todos = ""
        saveToLocal()
        showAlert("All todo Deleted Successfully" , "success")
        showTable() ;
    }
}

const deleteHandler = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    todos = newTodos;
    saveToLocal();
    showAlert("Todo Deleted Successfully" , "success");
    showTable() ;
}

const doHandler = (id) => {
    const newTodos = todos.find((todo) => todo.id === id)
    newTodos.complated = !newTodos.complated ;
    saveToLocal();
    showAlert("Todo Status Changed Successfully" , "success")
    showTable()
}

const editHandler = (id) => {
    const newTodos = todos.find((todo) => todo.id === id)
    taskInput.value = newTodos.task ;
    dateInput.value = newTodos.date ;
    editButton.style.display = "block";
    addButton.style.display = "none";
    editButton.dataset.id = id
    saveToLocal() ;
    showTable() ;

}


const applyEditHandler = (event) => {
    const id = event.target.dataset.id
    const newTodos = todos.find((todo) => todo.id === id)
    newTodos.task = taskInput.value 
    newTodos.date = dateInput.value
    editButton.style.display = "none"
    addButton.style.display = "block"
    showTable()
    saveToLocal()
    showAlert("todo Edited Successfully" , "success")
}

addButton.addEventListener("click" , addHandler)

window.addEventListener("load" , showTable)
deleteAllBtn.addEventListener("click" , deleteAllHandler)
editButton.addEventListener("click" , applyEditHandler)


