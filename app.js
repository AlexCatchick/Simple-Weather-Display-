document.addEventListener("DOMContentLoaded", function () {
  const cityInput = document.querySelector("#city-input");
  const getWeatherBtn = document.querySelector("#get-weather-button");
  const weatherDetails = document.querySelector("#weather-info");
  const showCity = document.querySelector("#city-name");
  const showTemp = document.querySelector("#temperature");
  const showDescription = document.querySelector("#description");
  const showErrorMsg = document.querySelector("#error-message");
  const API_KEY = "c557c46c738738c93009cf1a39350d45";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    try {
      const data = await fetchWeatherData(city);
      displayWeatherData(data);
    } catch (error) {
      showError();
    }
  });
  async function fetchWeatherData(city) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(URL);
    if (!response.ok) throw new Error("City Not Found");
    const data = await response.json();
    console.log(data);
    return data;
  }
  function displayWeatherData(data) {
    weatherDetails.classList.remove("hidden");
    showErrorMsg.classList.add("hidden");
    const { main, name, weather } = data;
    showCity.textContent = name;
    showTemp.textContent = "Temperature: " + main.temp + "°C";
    showDescription.textContent = "Looks like: " + weather[0].description;
  }
  function showError() {
    weatherDetails.classList.add("hidden");
    showErrorMsg.classList.remove("hidden");
  }
});
