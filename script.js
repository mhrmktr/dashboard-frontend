// ✅ Deine echte API-URL von Render
const BASE_URL = "https://personal-dashboard-backend-d8xz.onrender.com";

// ✅ Helper für API Calls
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: "Fehler beim Abruf" };
  }
}

// ✅ Heizöl abrufen
async function loadHeizoel() {
  const data = await fetchData("/api/heizoel");
  document.querySelector("#heizoel .value").innerText =
    data.price ? data.price : "Keine Daten";
}

// ✅ FX abrufen
async function loadFX() {
  const data = await fetchData("/api/fx");
  if (data.USD && data.TRY) {
    document.querySelector("#fx .value").innerText =
      `EUR/USD: ${data.USD}\nEUR/TRY: ${data.TRY}`;
  } else {
    document.querySelector("#fx .value").innerText = "Keine Daten";
  }
}

// ✅ Wetter abrufen
async function loadWeather() {
  const city = document.getElementById("cityInput").value;
  const data = await fetchData(`/api/weather?city=${city}`);
  const el = document.querySelector("#weather .value");

  if (data.main) {
    el.innerText = `${data.main.temp}°C – ${data.weather[0].description}`;
  } else {
    el.innerText = "Keine Daten";
  }
}

// ✅ Erste Daten laden
loadHeizoel();
loadFX();
loadWeather();

// ✅ Alle 5 Minuten aktualisieren
setInterval(() => {
  loadHeizoel();
  loadFX();
}, 5 * 60 * 1000);
``
