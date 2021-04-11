const bodyImg = document.querySelector("body");

const JPG_NUM = 4;

function paintImage(jpgNum) {
  const Jpg = new Image();
  Jpg.src = `bgjpg/${jpgNum + 1}.jpg`;
  Jpg.classList.add("bg-jpg");
  bodyImg.prepend(Jpg);
}

function getRandom() {
  const Num = Math.floor(Math.random() * JPG_NUM);
  return Num;
}

function init() {
  const ranNumber = getRandom();
  paintImage(ranNumber);
}

init();
