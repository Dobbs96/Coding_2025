// Global variable
const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent refresh
    addToDo();
});

// addToDo - Get input, store object with text + checked, save to localStorage
function addToDo() {
    const toDoText = todoInput.value.trim();
    if (toDoText.length > 0) {
        const todoObject = {
            text: toDoText,
            checked: false,
        };
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}

// updateTodoList - Render todos from array to DOM
function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    });
}

// createTodoItem - Render <li> with checkbox, text, update and delete buttons
function createTodoItem(todo, todoIndex) {
    const todoLI = document.createElement("li");
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="todo-${todoIndex}" />
        <label for="todo-${todoIndex}" class="todo-text">${todo.text}</label>
        <button class="update-button">Update</button>
        <button class="delete-button">X</button>
    `;

    const checkbox = todoLI.querySelector("input");
    const updateButton = todoLI.querySelector(".update-button");
    const deleteButton = todoLI.querySelector(".delete-button");

    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].checked = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todo.checked;

    updateButton.addEventListener("click", () => {
        updateTodo(todoIndex);
    });

    deleteButton.addEventListener("click", () => {
        deleteTodo(todoIndex);
    });

    return todoLI;
}

// saveTodos - Save todo array as JSON in localStorage
function saveTodos() {
    const todosJSON = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJSON);
}

// getTodos - Load todos from localStorage
function getTodos() {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
}

// updateTodo - Prompt new text, update array, save and re-render
function updateTodo(todoIndex) {
    const currentText = allTodos[todoIndex].text;
    const newTodoText = prompt("Update your task:", currentText);
    if (newTodoText !== null && newTodoText.trim().length > 0) {
        allTodos[todoIndex].text = newTodoText.trim();
        saveTodos();
        updateTodoList();
    }
}

// deleteTodo - Remove item from array and re-render
function deleteTodo(todoIndex) {
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}
