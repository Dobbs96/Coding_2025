// Global varible

const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addToDo();
});

function addToDo() {
  const toDoText = todoInput.value.trim();
  if (toDoText.length > 0) {
    const todoObject = {
      text: toDoText,
      completed: false,
    };
    allTodos.push(todoObject);
    updateTodoList();
    saveTodos();
    todoInput.value = "";
  }
}

// update form to be able to use allTodos array
function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}

function createTodoItem(todo, todoIndex) {
  const todoLI = document.createElement("li");
  todoLI.className = "todo";
  todoLI.innerHTML = `
    <input type="checkbox" id="todo-${todoIndex}" />
    <label for="todo-${todoIndex}" class="todo-text">
    ${todo.text}</label>
    <!--<button class="update-button">Update</button>-->
    <button class="delete-button">X</button>
    `;
  //   const updateButton = todoLI.querySelector(".update-button");
  const deleteButton = todoLI.querySelector(".delete-button");
  //   updateButton.addEventListener("click", () => {
  //     updateTodo(todoIndex);
  //   });
  deleteButton.addEventListener("click", () => {
    deleteTodo(todoIndex);
  });
  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todo.completed;
  return todoLI;
}

function saveTodos() {
  const todosJSON = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJSON);
}

function getTodos() {
  const todos = localStorage.getItem("todos") || [];
  return JSON.parse(todos);
}

// function updateTodo(todoIndex) {

// }
function deleteTodo(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
}
