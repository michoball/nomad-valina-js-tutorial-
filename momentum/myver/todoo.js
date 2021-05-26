"use strict";
const todo = document.querySelector(".js-todoo"),
  todooInput = todo.querySelector("input"),
  todolist = document.querySelector(".js-todoolist");

const TODOS_LS = "todoos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const btn = event.target;
  const prli = btn.parentNode;
  todolist.removeChild(prli);
  const cleanTodoo = toDos.filter(function (todo) {
    return todo.id !== parseInt(prli.id);
  });
  toDos = cleanTodoo;
  saveToDos();
}

function printTodoo(text) {
  const li = document.createElement("li"),
    delBtn = document.createElement("button"),
    span = document.createElement("span"),
    newId = toDos.length + 1;

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);

  li.id = newId;
  todolist.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currValue = todooInput.value;
  printTodoo(currValue);
  todooInput.value = "";
}

function loadTodoo() {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parsedToDOs = JSON.parse(loadedTodos);
    parsedToDOs.forEach(function (todo) {
      printTodoo(todo.text);
    });
  }
}

function init() {
  loadTodoo();
  todo.addEventListener("submit", handleSubmit);
}

init();
