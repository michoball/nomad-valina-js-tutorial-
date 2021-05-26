"use strict";

const form = document.querySelector(".js-name"),
  input = form.querySelector("input"),
  hello = document.querySelector(".js-hello");

const USER = "name";
const SHOW = "showing";

function saveName(text) {
  localStorage.setItem(USER, text);
}

function handlesubmit(event) {
  event.preventDefault();
  const currUser = input.value;
  printName(currUser);
  saveName(currUser);
}

function askName() {
  form.classList.add(SHOW);
  form.addEventListener("submit", handlesubmit);
}

function printName(text) {
  form.classList.remove(SHOW);
  hello.classList.add(SHOW);
  hello.innerText = `HELLO ${text}`;
}

function loadname() {
  const UUser = localStorage.getItem(USER);

  if (UUser === null) {
    askName();
  } else {
    printName(UUser);
  }
}

function init() {
  loadname();
}

init();
