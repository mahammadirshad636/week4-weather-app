# 🌤️ Weather Dashboard Web Application

A modern, responsive **Weather Dashboard Web App** that displays **real-time weather data**, **5-day forecast**, and an **interactive map** using the **OpenWeatherMap API** and **Leaflet.js**.  
The application automatically detects the **user’s current location weather** on load and allows searching weather for any city worldwide with autocomplete suggestions.

---

## 📌 Features

### ✅ Core Features
- 🌍 **Current Location Weather** (using browser geolocation)
- 🔍 **City Search with Autocomplete Suggestions**
- 🌡️ **Temperature Unit Toggle (°C / °F)**
- 🗺️ **Interactive Map (Leaflet + OpenStreetMap)**
- 📅 **5-Day Weather Forecast**
- 🌙 **Dark / Light Theme Toggle**
- 💾 **Last Searched City Saved (LocalStorage)**

### ✅ UI & UX
- Responsive design (Desktop, Tablet, Mobile)
- Weather card and map aligned **side-by-side with equal size**
- Clean modern UI with weather icons
- Graceful fallback when location permission is denied

---

## 🛠️ Technologies Used

| Technology | Purpose |
|----------|--------|
| HTML5 | Page structure |
| CSS3 | Styling & responsive layout |
| JavaScript (ES6 Modules) | Application logic |
| OpenWeatherMap API | Weather & forecast data |
| Leaflet.js | Interactive maps |
| OpenStreetMap | Map tiles |
| Browser Geolocation API | Current location detection |
| LocalStorage | Persist last searched city |

---

## 📂 Project Folder Structure

---

## 📄 File Descriptions

### 🔹 `index.html`
- Main entry point of the application
- Contains:
  - Header
  - Search bar with autocomplete
  - Weather + Map layout
  - Forecast section
- Loads CSS, Leaflet, and JavaScript modules

---

### 🎨 `css/style.css`
- Core styling for:
  - Weather cards
  - Map container
  - Search dropdown
  - Buttons
  - Dark & light themes
- Uses **CSS Grid** for equal-height layout between map and weather card

---

### 🎨 `css/responsive.css`
- Mobile & tablet responsiveness
- Switches layout from side-by-side to stacked view

---

### ⚙️ `js/config.js`
Stores API configuration.

```js
export const CONFIG = {
    API_KEY: "YOUR_OPENWEATHER_API_KEY",
    BASE_URL: "https://api.openweathermap.org/data/2.5"
};

