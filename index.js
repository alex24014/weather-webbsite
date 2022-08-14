function time() {
  let date = new Date();
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sut"];
  let weekday = weekdays[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();
  let now = document.querySelector("#currentDate");
  now.innerHTML = `${weekday}, ${hour}:${minute}`;
}
time();

let cityNow = document.querySelector("#city");
let cityNowInput = document.querySelector("#search-input");
let temperature = document.querySelector("#now-deegre");

function place(event) {
  event.preventDefault();
  if (cityNowInput.value) {
    cityNow.innerHTML = `${cityNowInput.value}`;
    searchCity(cityNowInput.value);
  } else {
    cityNow.innerHTML = `Pleas search for a city.`;
  }
}
let region = document.querySelector("#search-form");
region.addEventListener("submit", place);

let apiKey = "2dae7f22c72eb4ff76ea3c6c2e98a172";

function searchCity(city) {
  console.log("ss");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(handleResponse);
}

function handleResponse(response) {
  let temperature = document.querySelector("#now-deegre");
  let prec = document.querySelector("#prec");
  let wind = document.querySelector("#wind");
  let emo = document.querySelector("#emo");

  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  prec.innerHTML = `Precipitation ${Math.round(response.data.main.humidity)} %`;
  wind.innerHTML = `Wind ${Math.round(response.data.wind.speed)} m/s`;
  emo.innerHTML = `${response.data.weather[0].description} `;
}

function currentPosition(position) {
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl2).then(yourTemperature);
}
function yourTemperature(response) {
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  cityNow.innerHTML = `${response.data.name}`;
  prec.innerHTML = `Precipitation ${Math.round(response.data.main.humidity)} %`;
  wind.innerHTML = `Wind ${Math.round(response.data.wind.speed)} m/s`;
  emo.innerHTML = `${response.data.weather.main} `;
}
function nowPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", nowPosition);
