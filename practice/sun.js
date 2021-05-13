const sun = document.querySelector(".js_sun");

const API_KEY = "ea431fe784ef38047a4a0cb46bff93cb";
const CORDS = "coords";

function getSun(lat, long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const poz = json.name;
      sun.innerText = `${temp} @ ${poz}`;
    });
}

function saveCoords(coordInfo) {
  localStorage.setItem(CORDS, JSON.stringify(coordInfo));
}

function handleGeoSucces(position) {
  const lat = position.coords.latitude;
  const long = position.coords.longitude;
  const coordObj = {
    lat,
    long,
  };
  saveCoords(coordObj);
  getSun(lat, long);
}

function handleGeoError() {
  console.log("Can't access geo location!");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoError, handleGeoSucces);
}

function loadCord() {
  const loadedCords = localStorage.getItem(CORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    const parsedCord = JSON.parse(loadedCords);
    getSun(parsedCord.latitude, parsedCord.longitude);
  }
}

function init() {
  loadCord();
}

init();
