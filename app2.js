const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const alertMessage = document.getElementById("alert-message");
const tableBody = document.querySelector("tbody");
const deleteAllButton = document.getElementById("delete-all-button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const save = () => {
  return localStorage.setItem("todos", JSON.stringify(todos));
};

const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 18)
  ).toString();
};

const showDisplay = () => {
  tableBody.innerHTML = "";
  if (!todos.length) {
    tableBody.innerHTML = `<tr>
            <td colspan = '4'>No Task Found!!</td>
        </tr>`;
  }

  todos.forEach((todo) => {
    tableBody.innerHTML += `
        <tr>
            <td>${todo.task}</td>
            <td>${todo.date || "No Date"}</td>
            <td>${todo.complated ? "Complated" : "Pennding"}</td>
            <td>
                <button onClick="editHandler('${todo.id}')">Edit</button>
                <button onClick="doHandler('${todo.id}')">${
      todo.complated ? "Undo" : "Do"
    }</button>
                <button onClick="deleteHandler('${todo.id}')">Delete</button>
            </td>
        </tr>
        `;
  });
};

const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;

  const todo = {
    id: generateId(),
    task: task,
    date: date,
    complated: false,
  };
  if (task) {
    todos.push(todo);
    taskInput.value = "";
    dateInput.value = "";
    console.log(todos);
    showAlert("Todo Add Successfully", "success");
    showDisplay();
    save();
  } else {
    showAlert("Please Enter Your Task!", "error");
  }
};

const deleteAllHandler = () => {
  if (todos.length) {
    todos = [];
    save();
    showDisplay();
    showAlert("All Todo Deleteed Successfully", "success");
  } else {
    showAlert("No Todo For Deleted!!", "error");
  }
};

const deleteHandler = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
  save();
  showDisplay();
  showAlert("Todo Deleted Successfully", "success");
};

const doHandler = (id) => {
  const newTodos = todos.find((todo) => todo.id === id);
  newTodos.complated = !newTodos.complated;
  save();
  showDisplay();
  showAlert("Todo Status Changed Successfully", "success");
};

const editHandler = (id) => {
  const newTodos = todos.find((todo) => todo.id === id);
  taskInput.value = newTodos.task;
  dateInput.value = newTodos.date;
  addButton.style.display = "none";
  editButton.style.display = "block";
  editButton.dataset.id = id;
  console.log(editButton);
};

const applyEditHandler = (event) => {
  const id = event.target.dataset.id;
  const newTodos = todos.find((todo) => todo.id === id);
  newTodos.task = taskInput.value;
  newTodos.date = dateInput.value;
  addButton.style.display = "block";
  editButton.style.display = "none";
  taskInput.value = "";
  dateInput.value = "";
  save();
  showAlert("Todo Edited Successfully", "success");
  showDisplay();
};

addButton.addEventListener("click", addHandler);
window.addEventListener("load", showDisplay);
deleteAllButton.addEventListener("click", deleteAllHandler);
editButton.addEventListener("click", applyEditHandler);
