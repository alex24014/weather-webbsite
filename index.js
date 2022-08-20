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
let celciusTemperature = null;

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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleResponse);
}

function futureDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekdays = [
    "Sunday:",
    "Monday:",
    "Tuesday:",
    "Wednsday:",
    "Thursday:",
    "Friday:",
    "Suterday:",
  ];
  return weekdays[day];
}

function displayForecast(response) {
  console.log(response.data);
  let forecastDays = response.data.daily;
  let forecast = document.querySelector("#forecast");

  let forecastHTML = "";

  forecastDays.forEach(function (eachForecastDays, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        ` <li class="C" >
                    <div class="container">
                      <div class="row">
                    <div class="col-4">
                      <img src="http://openweathermap.org/img/wn/${
                        eachForecastDays.weather[0].icon
                      }@2x.png" width="40"> </img>
                      </div>
                      <div class="col-4" id="weather-1">
                      ${Math.round(eachForecastDays.temp.day)}°C
                      </div>
                      <div class="col-4">
                      <span class="day1" id="plus-day-1">${futureDays(
                        eachForecastDays.dt
                      )}</span> 
                      </div>
                      </div>
                      </div>
                    </li>
                    `;
    }
  });

  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function handleResponse(response) {
  let temperature = document.querySelector("#now-deegre");
  let prec = document.querySelector("#prec");
  let wind = document.querySelector("#wind");
  let emo = document.querySelector("#emo");

  celciusTemperature = response.data.main.temp;

  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  prec.innerHTML = `Precipitation ${Math.round(response.data.main.humidity)} %`;
  wind.innerHTML = `Wind ${Math.round(response.data.wind.speed)} m/s`;
  emo.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/10d${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function currentPosition(position) {
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl2).then(yourTemperature);
}
function yourTemperature(response) {
  celciusTemperature = response.data.main.temp;
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  cityNow.innerHTML = `${response.data.name}`;
  prec.innerHTML = `Precipitation ${Math.round(response.data.main.humidity)} %`;
  wind.innerHTML = `Wind ${Math.round(response.data.wind.speed)} m/s`;
  emo.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/10d${response.data.weather[0].icon}@2x.png`
  );
}
function nowPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", nowPosition);

function showCelciusT(event) {
  event.preventDefault();
  temperature.innerHTML = Math.round(celciusTemperature);
  celcius.classList.add("cool");
  fahrenheit.classList.remove("cool");
}

let celcius = document.querySelector("#C-deegre");
celcius.addEventListener("click", showCelciusT);

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureFahrenheit = (celciusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(temperatureFahrenheit);
  celcius.classList.remove("cool");
  fahrenheit.classList.add("cool");
}

let fahrenheit = document.querySelector("#F-deegre");
fahrenheit.addEventListener("click", showFahrenheit);
