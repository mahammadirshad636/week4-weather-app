import { WeatherService } from "./weatherService.js";
import { WeatherUI } from "./ui.js";
import { Storage } from "./storage.js";

const service = new WeatherService();
const ui = new WeatherUI();

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const unitToggle = document.getElementById("unitToggle");
const themeToggle = document.getElementById("themeToggle");
const suggestionsBox = document.getElementById("suggestions");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent =
        document.body.classList.contains("dark") ? "☀️" : "🌙";
});

function loadCurrentLocationWeather() {
    if (!navigator.geolocation) {
        loadCityWeather(Storage.getCity());
        return;
    }

    ui.showLoading();

    navigator.geolocation.getCurrentPosition(
        async position => {
            try {
                const { latitude, longitude } = position.coords;

                const weather = await service.getCurrentWeatherByLocation(latitude, longitude);
                const forecast = await service.getForecastByLocation(latitude, longitude);

                ui.displayCurrentWeather(weather, "Current Location Weather");
                ui.displayForecast(forecast);

                Storage.saveCity(weather.name);
            } catch (err) {
                ui.showError(err.message);
            }
        },
        () => {
            // Permission denied → fallback
            loadCityWeather(Storage.getCity());
        }
    );
}

async function loadCityWeather(city) {
    try {
        ui.showLoading();

        const weather = await service.getCurrentWeather(city);
        const forecast = await service.getForecast(city);

        ui.displayCurrentWeather(weather, "Searched City Weather");
        ui.displayForecast(forecast);

        Storage.saveCity(city);
    } catch (err) {
        ui.showError(err.message);
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) loadCityWeather(city);
});

unitToggle.addEventListener("click", () => {
    ui.currentUnit = ui.currentUnit === "celsius" ? "fahrenheit" : "celsius";
    unitToggle.textContent = ui.currentUnit === "celsius" ? "°F" : "°C";

    const city = Storage.getCity();
    if (city) loadCityWeather(city);
});

searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();
    suggestionsBox.innerHTML = "";

    if (query.length < 2) return;

    const cities = await service.searchCities(query);

    cities.forEach(city => {
        const li = document.createElement("li");
        li.textContent = `${city.name}, ${city.country}`;
        li.onclick = () => {
            searchInput.value = city.name;
            suggestionsBox.innerHTML = "";
            loadCityWeather(city.name);
        };
        suggestionsBox.appendChild(li);
    });
});

loadCurrentLocationWeather();
