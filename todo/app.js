// Global varible

const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUL = document.getElementById("todo-list");

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault(); //to prevent website to refresh after each submit
  addToDo();
});

// addTodo- Take the value of the data inside the input. Data should have text and checked. Store that data into and array. Make sure data is saved into Local Storage.
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

// updateTodoList- Update array to have data from input data
function updateTodoList() {
  todoListUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    todoItem = createTodoItem(todo, todoIndex);
    todoListUL.append(todoItem);
  });
}

// createTodoItem- Create elements to add data from the array into the unordered list. The element will then need to have a listening event to change data in the full form. Return should be that List Item.
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
    allTodos[todoIndex].checked = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todo.checked;
  return todoLI;
}

// saveTodos- be able to read JSON as string
function saveTodos() {
  const todosJSON = JSON.stringify(allTodos);
  localStorage.setItem("todos", todosJSON);
}

// getTodos- Get Item fromt he local Storage. Returns a string.
function getTodos() {
  const todos = localStorage.getItem("todos") || [];
  return JSON.parse(todos);
}

// updateTodo- Selete tezt in that List Item and update seleted text to be change what user wants to change.
// function updateTodo(todoIndex) {
///// get data from seleted update index
///// modify text to new data
///// update button change to save
///// after save clicked change back to update
// }

// deleteTodo- Fliter lest to remove List Item seleted.
function deleteTodo(todoIndex) {
  allTodos = allTodos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodoList();
}
