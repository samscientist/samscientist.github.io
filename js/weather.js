const API_KEY = "1a2ac374a0e0b1e49b108f19f06a6132";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longtitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
            city.innerText = data.name;
            weather.innerText = data.weather[0].main;
        });
}
function onGeoError() {
    alert("Can't find you. No weather information could be served.")
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);