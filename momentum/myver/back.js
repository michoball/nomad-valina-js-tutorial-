const body = document.querySelector("body");

const IMG_NUMBER = 8;

function ShowImg(imgNum) {
  const img = new Image();
  img.src = `../images/${imgNum + 1}.jpg`;
  img.classList.add("bgImage");
  body.prepend(img);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  ShowImg(randomNumber);
}

init();
