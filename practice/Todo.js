const ToDoForm = document.querySelector(".my-Todoform"),
  ToDoInput = ToDoForm.querySelector("input"),
  ToDoList = document.querySelector(".my-TodoList");

const TODOS_L = "Todo";
let Todos = [];

function deleteToDos(event) {
  const btn = event.target;
  const li = btn.parentNode;
  ToDoList.removeChild(li);
  const cleanToDos = Todos.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  Todos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_L, JSON.stringify(Todos));
}

function paintToDos(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = Todos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDos);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  ToDoList.appendChild(li);
  const ToDoObj = {
    text: text,
    id: newId,
  };
  Todos.push(ToDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = ToDoInput.value;
  paintToDos(currentValue);
  ToDoInput.value = "";
}

function loadToDos() {
  const loadedTodo = localStorage.getItem(TODOS_L);
  if (loadedTodo !== null) {
    const parsedToDos = JSON.parse(loadedTodo);
    parsedToDos.forEach(function (todo) {
      paintToDos(todo.text);
    });
  }
}

function init() {
  loadToDos();
  ToDoForm.addEventListener("submit", handleSubmit);
}

init();
