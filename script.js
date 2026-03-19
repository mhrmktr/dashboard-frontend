const BASE_URL = "https://personal-dashboard-backend-m5ur.onrender.com";

function setVal(id, html) {
  var el = document.getElementById(id);
  if (el) {
    el.classList.remove("skeleton");
    el.innerHTML = html;
  }
}

function setBadge(id, text, cls) {
  var el = document.getElementById(id);
  if (el) {
    el.textContent = text;
    el.className = "badge " + cls;
  }
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
    var price = d.price ? d.price : "-";
    setVal("heizoel-main", '<div class="main-value">' + price + '</div>');
    setVal("heizoel-sub", '<span class="change neutral">pro 100 Liter</span>');
    setBadge("badge-heizoel", "Live", "live");
  }).catch(function() {
    setVal("heizoel-main", '<div class="main-value" style="color:#f85149">Fehler</div>');
    setBadge("badge-heizoel", "Fehler", "error");
  });
}

function loadFX() {
  apiFetch("/api/fx").then(function(d) {
    var usd = d.USD ? d.USD : "-";
    var tr = d.TRY ? d.TRY : "-";
    setVal("usd-main", '<div class="main-value">' + usd + '</div>');
    setVal("usd-sub", '<span class="change neutral">1 EUR = ' + usd + ' USD</span>');
    setBadge("badge-usd", "Live", "live");
    setVal("try-main", '<div class="main-value">' + tr + '</div>');
    setVal("try-sub", '<span class="change neutral">1 EUR = ' + tr + ' TRY</span>');
    setBadge("badge-try", "Live", "live");
  }).catch(function() {
    setVal("usd-main", '<div class="main-value" style="color:#f85149">Fehler</div>');
    setVal("try-main", '<div class="main-value" style="color:#f85149">Fehler</div>');
    setBadge("badge-usd", "Fehler", "error");
    setBadge("badge-try", "Fehler", "error");
  });
}

function loadWeather() {
  var city = document.getElementById("cityInput").value || "Duesseldorf";
  apiFetch("/api/weather?city=" + encodeURIComponent(city)).then(function(d) {
    var temp = d.main && d.main.temp ? d.main.temp : "-";
    var feels = d.main && d.main.feels_like ? d.main.feels_like : "-";
    var humidity = d.main && d.main.humidity ? d.main.humidity : "-";
    var desc = d.weather && d.weather[0] ? d.weather[0].description : "";
    setVal("weather-main", '<div class="main-value">' + temp + ' C</div>');
    setVal("weather-sub", desc + ' - Gefuehlt ' + feels + ' C - Luftfeuchtigkeit ' + humidity + '%');
    setBadge("badge-weather", "Live", "live");
  }).catch(function() {
    setVal("weather-main", '<div class="main-value" style="color:#f85149">Fehler</div>');
    setBadge("badge-weather", "Fehler", "error");
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
