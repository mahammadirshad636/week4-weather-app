export const Storage = {
    saveCity(city) {
        localStorage.setItem("lastCity", city);
    },
    getCity() {
        return localStorage.getItem("lastCity") || "London";
    }
};
