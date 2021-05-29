"use strict";
const weather = document.querySelector(".js-weather");
const API_KEY = "ea431fe784ef38047a4a0cb46bff93cb";
const COORDS = "Coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const place = json.name;
      weather.innerText = `${temp} @ ${place}`;
    });
}

function saveCoords(coordsOj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsOj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsOj = {
    latitude,
    longitude,
  };
  saveCoords(coordsOj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("XXX");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
