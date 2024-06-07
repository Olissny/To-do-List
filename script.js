const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const prioritySelect = document.querySelector("#priority-select");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
let filter = '';

showTodos();

function getTodoHtml(todo, index) {
  if (filter && filter != todo.status) {
    return '';
  }
  let checked = todo.status == "completed" ? "checked" : "";
  let priorityClass = '';
  if (todo.priority === 'HIGH') {
    priorityClass = 'high-priority';
  } else if (todo.priority === 'MEDIUM') {
    priorityClass = 'medium-priority';
  } else if (todo.priority === 'LOW') {
    priorityClass = 'low-priority';
  }
  return `
    <li class="todo">
      <label>
        <input data-index="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
        <p class="${priorityClass}">${todo.priority}</p> 
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
  `;
}



function showTodos() {
  if (todosJson.length == 0) {
    todosHtml.innerHTML = '';
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
  }
}

function addTodo(todo, priority) {
  if (priority === "Priority") {
    alert("Please select a priority before adding a task.");
    return;
  }
  input.value = "";
  todosJson.unshift({ name: todo, status: "pending", priority: priority });
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}


addButton.addEventListener("click", () => {
  let todo = input.value.trim();
  let priority = prioritySelect.value;
  if (!todo) {
    return;
  }
  addTodo(todo, priority);
});


function updateStatus(todo) {
  let index = todo.dataset.index;
  let todoName = todo.nextElementSibling;
  if (todo.checked) {
    todoName.classList.add("checked");
    todosJson[index].status = "completed";
  } else {
    todoName.classList.remove("checked");
    todosJson[index].status = "pending";
  }
  localStorage.setItem("todos", JSON.stringify(todosJson));
}


function remove(todo) {
  const index = todo.dataset.index;
  todosJson.splice(index, 1);
  showTodos();
  localStorage.setItem("todos", JSON.stringify(todosJson));
}
