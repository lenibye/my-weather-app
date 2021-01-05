//1
let now = new Date();
let update = document.querySelector("#update");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let timezone = now.toString().match(/\(([A-Za-z\s].*)\)/)[1];

update.innerHTML = `Last updated: ${day}, ${hour}:${minute} </br>(*${timezone})`;

//2
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("#celsius-link");
  let windelement = document.querySelector("#wind");
  let humidityelement = document.querySelector("#humidity");
  let iconelement = document.querySelector("#iconelement");

  h1.innerHTML = `${city}`;
  h2.innerHTML = `${temperature}°C`;
  windelement.innerHTML = `Wind: ${wind} km/h`;
  humidityelement.innerHTML = `Humidity: ${humidity}%`;
  iconelement.setAttribute("src", `./img/${response.data.weather[0].icon}.png`);
  iconelement.setAttribute("alt", `${response.data.weather[0].description}`);
}

function showForecast(response) {
  let temperature = Math.round(response.data.list[0].main.temp);
  let time = response.data.list[0].dt_txt;
  time = time.slice(11, -3);
  let forecast0 = document.querySelector("#forecast0");
  forecast0.innerHTML = `<img src="./img/02d.png" width="50px" id="iconelement0" /> </br>🕒 ${time}* </br> 🌡️ ${temperature}°C`;
  let iconelement0 = document.querySelector("#iconelement0");
  iconelement0.setAttribute(
    "src",
    `./img/${response.data.list[0].weather[0].icon}.png`
  );

  temperature = Math.round(response.data.list[1].main.temp);
  time = response.data.list[1].dt_txt;
  time = time.slice(11, -3);
  let forecast1 = document.querySelector("#forecast1");
  forecast1.innerHTML = `<img src="./img/02d.png" width="50px" id="iconelement1" /> </br> 🕒 ${time}* </br> 🌡️ ${temperature}°C`;
  let iconelement1 = document.querySelector("#iconelement1");
  iconelement1.setAttribute(
    "src",
    `./img/${response.data.list[1].weather[0].icon}.png`
  );

  temperature = Math.round(response.data.list[2].main.temp);
  time = response.data.list[2].dt_txt;
  time = time.slice(11, -3);
  let forecast2 = document.querySelector("#forecast2");
  forecast2.innerHTML = `<img src="./img/02d.png" width="50px" id="iconelement2" /> </br> 🕒 ${time}* </br> 🌡️ ${temperature}°C`;
  let iconelement2 = document.querySelector("#iconelement2");
  iconelement2.setAttribute(
    "src",
    `./img/${response.data.list[2].weather[0].icon}.png`
  );

  temperature = Math.round(response.data.list[3].main.temp);
  time = response.data.list[3].dt_txt;
  time = time.slice(11, -3);
  let forecast3 = document.querySelector("#forecast3");
  forecast3.innerHTML = `<img src="./img/02d.png" width="50px" id="iconelement3" /> </br> 🕒 ${time}* </br> 🌡️ ${temperature}°C`;
  let iconelement3 = document.querySelector("#iconelement3");
  iconelement3.setAttribute(
    "src",
    `./img/${response.data.list[3].weather[0].icon}.png`
  );
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "21de711a93f4b833469cf486a6d6e74e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getPosition);

//3
function changeCity(city) {
  city.preventDefault();
  let searchInput = document.querySelector("#input-city");
  let cityInput = searchInput.value;
  let apiKey = "21de711a93f4b833469cf486a6d6e74e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

let cityinput = document.querySelector("#city-form");
cityinput.addEventListener("submit", changeCity);

//4

let clickState = 0;
let c1 = document.querySelector("#celsius-link");
let temperatureorg = c1.innerHTML;

function changeTemp(event) {
  if (clickState == 0) {
    event.preventDefault();

    let temp1 = parseInt(c1.innerHTML, 10);
    let temp2 = Math.round((temp1 * 9) / 5 + 32);
    c1.innerHTML = `${temp2} °F`;
    let f1 = document.querySelector("#fahrenheit-link");
    f1.innerHTML = "°C";
    clickState = 1;
  } else {
    c1.innerHTML = temperatureorg;
    let f1 = document.querySelector("#fahrenheit-link");
    f1.innerHTML = "°F";
    clickState = 0;
  }
}

let temperature = document.querySelector("#fahrenheit-link");
temperature.addEventListener("click", changeTemp);
