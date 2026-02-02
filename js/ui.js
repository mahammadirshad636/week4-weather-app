export class WeatherUI {
    constructor() {
        this.currentWeatherEl = document.getElementById("currentWeather");
        this.forecastEl = document.getElementById("forecast");
        this.currentUnit = "celsius";
    }

    convertTemp(temp) {
        return this.currentUnit === "celsius"
            ? Math.round(temp)
            : Math.round((temp * 9) / 5 + 32);
    }

    displayCurrentWeather(data, label = "Weather Information") {
        this.currentWeatherEl.innerHTML = `
            <div class="weather-card">
                <small>📍 ${label}</small>
                <h2>${data.name}, ${data.sys.country}</h2>

                <div class="weather-main">
                    <div class="temperature">${this.convertTemp(data.main.temp)}°</div>
                    <div>
                        <i class="wi wi-owm-${data.weather[0].id}"></i>
                        <p>${data.weather[0].description}</p>
                    </div>
                </div>

                <div class="weather-details">
                    <div class="detail"><span>Feels Like</span><span>${this.convertTemp(data.main.feels_like)}°</span></div>
                    <div class="detail"><span>Humidity</span><span>${data.main.humidity}%</span></div>
                    <div class="detail"><span>Wind</span><span>${data.wind.speed} m/s</span></div>
                    <div class="detail"><span>Pressure</span><span>${data.main.pressure} hPa</span></div>
                </div>
            </div>
        `;

        this.showMap(data.coord.lat, data.coord.lon, data.name);
    }

    displayForecast(data) {
        const days = {};
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000).toDateString();
            if (!days[date]) days[date] = item;
        });

        this.forecastEl.innerHTML = `
            <div class="forecast-container">
                ${Object.values(days).slice(0,5).map(day => `
                    <div class="forecast-day">
                        <strong>${new Date(day.dt * 1000).toLocaleDateString("en-US",{weekday:"short"})}</strong>
                        <i class="wi wi-owm-${day.weather[0].id}"></i>
                        <p>${this.convertTemp(day.main.temp_max)}° /
                           ${this.convertTemp(day.main.temp_min)}°</p>
                    </div>
                `).join("")}
            </div>
        `;
    }

    showLoading() {
        this.currentWeatherEl.innerHTML = `<p class="loading">Loading...</p>`;
        this.forecastEl.innerHTML = "";
    }

    showError(message) {
        this.currentWeatherEl.innerHTML = `
            <div class="error">
                ❌ ${message}<br><br>
                Try searching like:
                <b>London, Paris, Mumbai</b>
            </div>
        `;
        this.forecastEl.innerHTML = "";
    }

    showMap(lat, lon, city) {
        if (this.map) {
            this.map.setView([lat, lon], 10);
            this.marker.setLatLng([lat, lon])
                .bindPopup(`Weather Location: ${city}`)
                .openPopup();
            return;
        }

        this.map = L.map("map").setView([lat, lon], 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap"
        }).addTo(this.map);

        this.marker = L.marker([lat, lon])
            .addTo(this.map)
            .bindPopup(`Weather Location: ${city}`)
            .openPopup();

        // 🔥 IMPORTANT
        setTimeout(() => {
            this.map.invalidateSize();
        }, 200);
    }


}
