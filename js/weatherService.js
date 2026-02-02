import { CONFIG } from "./config.js";

export class WeatherService {

    async fetchWeather(city, type) {
        const encodedCity = encodeURIComponent(city.trim());

        const url = `${CONFIG.BASE_URL}/${type}?q=${encodedCity}&units=metric&appid=${CONFIG.API_KEY}`;

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            console.error("API ERROR:", data);
            throw new Error(data.message || "API Error");
        }

        return data;
    }

    async searchCities(query) {
        if (query.length < 2) return [];

        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${CONFIG.API_KEY}`;
        const res = await fetch(url);
        return await res.json();
    }

    getCurrentWeather(city) {
        return this.fetchWeather(city, "weather");
    }

    getForecast(city) {
        return this.fetchWeather(city, "forecast");
    }

    async getCurrentWeatherByLocation(lat, lon) {
        const url = `${CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${CONFIG.API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        return data;
    }

    async getForecastByLocation(lat, lon) {
        const url = `${CONFIG.BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${CONFIG.API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        return data;
    }

}
