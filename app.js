document.addEventListener("DOMContentLoaded", () => {
  const inputCity = document.querySelector("#input-city");
  const getWeatherBtn = document.querySelector("#get-weather-btn");
  const getWeatherInfoDisplay = document.querySelector("#get-weather-info");
  const errorMessageDisplay = document.querySelector("#error-message");
  const API_KEY = "c557c46c738738c93009cf1a39350d45";

  getWeatherBtn.addEventListener("click", async () => {
    const city = inputCity.value.trim();
    try {
      const data = await getWeather(city);
      showWeather(data);
    } catch (error) {
      showErrorOnFetch();
    }
  });
  async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Response not found");
    }
    const data = await response.json();
    console.log(data);
    return data;
  }
  function showWeather(weatherData) {
    getWeatherInfoDisplay.classList.remove("hidden");
    errorMessageDisplay.classList.add("hidden");
    const { name, main, weather } = weatherData;
    getWeatherInfoDisplay.querySelector("#city-name").textContent = name;
    getWeatherInfoDisplay.querySelector(
      "#temperature"
    ).textContent = `Temperature : ${main.temp} °C`;
    getWeatherInfoDisplay.querySelector(
      "#describe"
    ).textContent = `Description : ${weather[0].description}`;
  }
  function showErrorOnFetch() {
    getWeatherInfoDisplay.classList.add("hidden");
    errorMessageDisplay.classList.remove("hidden");
  }
});
