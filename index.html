const BASE_URL = "https://personal-dashboard-backend-m5ur.onrender.com";

function setVal(id, html) {
  var el = document.getElementById(id);
  if (el) { el.classList.remove("skeleton"); el.innerHTML = html; }
}

function setBadge(id, text, cls) {
  var el = document.getElementById(id);
  if (el) { el.textContent = text; el.className = "badge " + cls; }
}

function getTime() {
  return new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

function apiFetch(path) {
  return fetch(BASE_URL + path).then(function(r) {
    if (!r.ok) throw new Error(r.status);
    return r.json();
  });
}

function loadHeizoel() {
  apiFetch("/api/heizoel").then(function(d) {
    setVal("heizoel-main", '<div class="main-value">' + (d.price || "-") + '</div>');
    setVal("heizoel-sub", '<span>pro 100 Liter</span>');
    setBadge("badge-heizoel", "Live", "live");
  }).catch(function() {
    setVal("heizoel-main", '<div class="main-value" style="color:#f85149;font-size:1em">Fehler</div>');
    setBadge("badge-heizoel", "Fehler", "error");
  });
}

function loadFX() {
  apiFetch("/api/fx").then(function(d) {
    var usd = d.USD || "-";
    var tr = d.TRY || "-";
    setVal("usd-main", '<div class="main-value">' + usd + '</div>');
    setVal("usd-sub", '1 EUR = ' + usd + ' USD');
    setBadge("badge-usd", "Live", "live");
    setVal("try-main", '<div class="main-value">' + tr + '</div>');
    setVal("try-sub", '1 EUR = ' + tr + ' TRY');
    setBadge("badge-try", "Live", "live");
  }).catch(function() {
    setVal("usd-main", '<div class="main-value" style="color:#f85149;font-size:1em">Fehler</div>');
    setVal("try-main", '<div class="main-value" style="color:#f85149;font-size:1em">Fehler</div>');
    setBadge("badge-usd", "Fehler", "error");
    setBadge("badge-try", "Fehler", "error");
  });
}

var icons = {
  "Clear": "☀️", "Clouds": "☁️", "Rain": "🌧️",
  "Drizzle": "🌦️", "Thunderstorm": "⛈️", "Snow": "❄️",
  "Mist": "🌫️", "Fog": "🌫️", "Haze": "🌫️"
};

function renderWeather(prefix, data) {
  var temp = data.temp !== null ? data.temp + " C" : "-";
  var feels = data.feels_like !== null ? data.feels_like + " C" : "-";
  var humidity = data.humidity || "-";
  var desc = data.description || "";
  var icon = icons[data.main] || "🌡️";
  document.getElementById("icon-" + prefix).textContent = icon;
  setVal("temp-" + prefix, '<div class="main-value">' + temp + '</div>');
  setVal("sub-" + prefix, desc + ' · Gefühlt ' + feels + ' · ' + humidity + '% Luftfeuchtigkeit');
  setBadge("badge-" + prefix, "Live", "live");
}

function loadWeather() {
  apiFetch("/api/weather/all").then(function(d) {
    if (d["Jersey City"])   renderWeather("jc",  d["Jersey City"]);
    if (d["New York City"]) renderWeather("nyc", d["New York City"]);
    if (d["Wiesbaden"])     renderWeather("wi",  d["Wiesbaden"]);
    if (d["Mainz"])         renderWeather("mz",  d["Mainz"]);
  }).catch(function() {
    ["jc","nyc","wi","mz"].forEach(function(p) {
      setVal("temp-" + p, '<div class="main-value" style="color:#f85149;font-size:1em">Fehler</div>');
      setBadge("badge-" + p, "Fehler", "error");
    });
  });
}

function refreshAll() {
  var icon = document.getElementById("refreshIcon");
  if (icon) icon.classList.add("spinning");
  loadHeizoel();
  loadFX();
  loadWeather();
  setTimeout(function() {
    if (icon) icon.classList.remove("spinning");
    var t = document.getElementById("updateTime");
    if (t) t.textContent = "Zuletzt: " + getTime() + " Uhr";
  }, 3000);
}

refreshAll();
setInterval(refreshAll, 5 * 60 * 1000);
