const BASE_URL = "https://DEINE-RENDER-URL.onrender.com";  // ← hier ersetzen!

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    return await response.json();
  } catch (err) {
    return { error: "Fehler beim Abruf" };
  }
}

async function loadHeizoel() {
  const data = await fetchData("/api/heizoel");
  document.querySelector("#heizoel .value").innerText =
    data.price ? `${data.price}` : "Keine Daten";
}

async function loadFX() {
  const data = await fetchData("/api/fx");
  if (data.USD && data.TRY) {
    document.querySelector("#fx .value").innerText =
      `EUR/USD: ${data.USD}\nEUR/TRY: ${data.TRY}`;
  } else {
    document.querySelector("#fx .value").innerText = "Keine Daten";
  }
}

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

loadHeizoel();
loadFX();
loadWeather();

setInterval(() => {
  loadHeizoel();
  loadFX();
}, 5 * 60 * 1000);
