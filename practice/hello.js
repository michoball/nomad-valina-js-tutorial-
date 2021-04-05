const form = document.querySelector(".my-form"),
  input = form.querySelector("input"),
  hello = document.querySelector(".my-hello");

const USER_L = "currUser",
  SHOWING_ON = "showing";

function saveName(text) {
  localStorage.setItem(USER_L, text);
}

function paintHello(text) {
  form.classList.remove(SHOWING_ON);
  hello.classList.add(SHOWING_ON);
  hello.innerText = `Hello! ${text}`;
}

function handleSubmit(event) {
  event.preventDefault();
  const currValue = input.value;
  paintHello(currValue);
  saveName(currValue);
}

function askName() {
  form.classList.add(SHOWING_ON);
  form.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currUser = localStorage.getItem(USER_L);
  if (currUser === null) {
    askName();
  } else {
    paintHello(currUser);
  }
}

function init() {
  loadName();
}
init();
