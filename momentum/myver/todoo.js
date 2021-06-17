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
  //화면에서 리스트 제거
  const btn = event.target;
  const prli = btn.parentNode;
  todolist.removeChild(prli);
  // 로컬스토리지에서 리스트 제거
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

  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  delBtn.innerText = "❌";

  li.appendChild(span);
  li.appendChild(delBtn);

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
