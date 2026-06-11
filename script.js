const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const errorMessage = document.getElementById("error-message");

// Charger les tâches au démarrage
document.addEventListener("DOMContentLoaded", loadTodos);

// Ajouter avec le bouton
addBtn.addEventListener("click", addTodo);

// Ajouter avec Entrée
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTodo();
    }
});

function addTodo() {

    const todoText = input.value.trim();

    if (todoText === "") {
        errorMessage.textContent = "Veuillez saisir une tâche.";
        return;
    }

    errorMessage.textContent = "";

    createTodoElement(todoText);

    saveTodo(todoText);

    input.value = "";
    input.focus();
}

function createTodoElement(todoText) {

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todoText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {

        li.remove();

        removeTodo(todoText);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
}

function saveTodo(todo) {

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(todo => {
        createTodoElement(todo);
    });
}

function removeTodo(todoText) {

    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos = todos.filter(todo => todo !== todoText);

    localStorage.setItem("todos", JSON.stringify(todos));
}