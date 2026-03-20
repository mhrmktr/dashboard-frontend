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

function apiFetch(url) {
  return fetch(url).then(function(r) {
    if (!r.ok) throw new Error(r.status);
    return r.json();
  });
}

// ── Heizöl ──
function loadHeizoel() {
  apiFetch(BASE_URL + "/api/heizoel").then(function(d) {
    setVal("heizoel-main", '<div class="main-value">' + (d.price || "-") + '</div>');
    setVal("heizoel-sub", 'pro 100 Liter');
    setBadge("badge-heizoel", "Live", "live");
  }).catch(function() {
    setVal("heizoel-main", '<div class="main-value" style="color:#f85149;font-size:1em">Fehler</div>');
    setBadge("badge-heizoel", "Fehler", "error");
  });
}

// ── FX ──
function loadFX() {
  apiFetch(BASE_URL + "/api/fx").then(function(d) {
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

// ── Gold (via CoinGecko - kostenlos, kein Key) ──
function changeItem(label, val) {
  if (val === null || val === undefined || isNaN(val)) {
    return '<div class="change-item"><div class="change-label">' + label + '</div><div class="change-val">–</div></div>';
  }
  var cls = val >= 0 ? "up" : "down";
  var sign = val >= 0 ? "+" : "";
  return '<div class="change-item"><div class="change-label">' + label + '</div><div class="change-val ' + cls + '">' + sign + parseFloat(val).toFixed(1) + '%</div></div>';
}

function renderAsset(mainId, changesId, badgeId, price, d, symbol) {
  setVal(mainId, '<div class="main-value">' + symbol + Math.round(price).toLocaleString() + '</div>');
  var html = changeItem("24H", d.change_24h)
           + changeItem("7T",  d.change_7d)
           + changeItem("1M",  d.change_1m)
           + changeItem("6M",  d.change_6m)
           + changeItem("YTD", d.change_ytd)
           + changeItem("5J",  d.change_5y);
  setVal(changesId, html);
  setBadge(badgeId, "Live", "live");
}

// ── Gold (via Backend + GoldAPI) ──
function loadGold() {
  apiFetch(BASE_URL + "/api/gold").then(function(d) {
    if (d.error) throw new Error(d.error);
    renderAsset("gold-main", "gold-changes", "badge-gold", d.price, d, "$");
  }).catch(function() {
    setVal("gold-main", '<div class="main-value" style="color:#f85149;font-size:1em">Fehler</div>');
    setBadge("badge-gold", "Fehler", "error");
  });
}

// ── Bitcoin (via Backend + CoinGecko) ──
function loadBTC() {
  apiFetch(BASE_URL + "/api/btc").then(function(d) {
    if (d.error) throw new Error(d.error);
    renderAsset("btc-main", "btc-changes", "badge-btc", d.price, d, "$");
  }).catch(function() {
    setVal("btc-main", '<div class="main-value" style="color:#f85149;font-size:1em">Fehler</div>');
    setBadge("badge-btc", "Fehler", "error");
  });
}

// ── Wetter ──
var icons = {
  "Clear": "☀️", "Clouds": "☁️", "Rain": "🌧️",
  "Drizzle": "🌦️", "Thunderstorm": "⛈️", "Snow": "❄️",
  "Mist": "🌫️", "Fog": "🌫️", "Haze": "🌫️"
};

function windDir(deg) {
  var dirs = ["N","NO","O","SO","S","SW","W","NW"];
  return dirs[Math.round(deg / 45) % 8];
}

function formatTime(unix, offset) {
  var d = new Date((unix + offset) * 1000);
  var h = d.getUTCHours().toString().padStart(2,"0");
  var m = d.getUTCMinutes().toString().padStart(2,"0");
  return h + ":" + m;
}

function renderWeather(prefix, data) {
  var temp = data.temp !== null ? Math.round(data.temp) + "°C" : "-";
  var tmin = data.temp_min !== null ? Math.round(data.temp_min) + "°C" : "-";
  var tmax = data.temp_max !== null ? Math.round(data.temp_max) + "°C" : "-";
  var feels = data.feels_like !== null ? Math.round(data.feels_like) + "°C" : "-";
  var humidity = data.humidity || "-";
  var desc = data.description || "";
  var icon = icons[data.main] || "🌡️";
  var wind = Math.round(data.wind_speed) + " km/h " + windDir(data.wind_deg);
  var sunrise = data.sunrise ? formatTime(data.sunrise, data.timezone_offset) : "-";
  var sunset = data.sunset ? formatTime(data.sunset, data.timezone_offset) : "-";
  var now = new Date();
  var localTime = new Date(now.getTime() + (data.timezone_offset + now.getTimezoneOffset() * 60) * 1000);
  var lh = localTime.getUTCHours().toString().padStart(2,"0");
  var lm = localTime.getUTCMinutes().toString().padStart(2,"0");
  var localStr = lh + ":" + lm + " Uhr (lokal)";

  document.getElementById("icon-" + prefix).textContent = icon;
  setVal("temp-" + prefix, '<div class="main-value">' + temp + '</div>');
  setVal("sub-" + prefix,
    '<div class="weather-detail-grid">' +
    '<span>☁️ ' + desc + '</span>' +
    '<span>🌡️ ' + tmin + ' / ' + tmax + '</span>' +
    '<span>💧 Gefühlt ' + feels + '</span>' +
    '<span>💦 Luftfeuchte ' + humidity + '%</span>' +
    '<span>💨 Wind ' + wind + '</span>' +
    '<span>🌅 ' + sunrise + ' · 🌇 ' + sunset + '</span>' +
    '<span>🕐 ' + localStr + '</span>' +
    '</div>'
  );
  setBadge("badge-" + prefix, "Live", "live");
}

function loadWeather() {
  apiFetch(BASE_URL + "/api/weather/all").then(function(d) {
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

// ── Formel 1 (via Jolpica - offizieller Ergast-Nachfolger) ──
var F1_BASE = "https://api.jolpi.ca/ergast/f1";

function posClass(p) {
  if (p === 1) return "top1";
  if (p === 2) return "top2";
  if (p === 3) return "top3";
  return "";
}

function f1Row(pos, name, stat) {
  return '<div class="f1-row"><div class="f1-pos ' + posClass(pos) + '">' + pos + '</div><div class="f1-name">' + name + '</div><div class="f1-stat">' + stat + '</div></div>';
}

function loadF1() {
  // Letztes Rennen
  apiFetch(F1_BASE + "/current/last/results.json?limit=10").then(function(d) {
    var race = d.MRData.RaceTable.Races[0];
    if (!race) throw new Error("no race");
    document.getElementById("f1-race-name").textContent = race.raceName + " " + race.season;
    var results = race.Results.slice(0, 10);
    var html = "";
    for (var i = 0; i < results.length; i++) {
      var r = results[i];
      var name = r.Driver.givenName + " " + r.Driver.familyName;
      var stat = r.status === "Finished" ? (r.Time ? r.Time.time : "Finished") : r.status;
      html += f1Row(parseInt(r.position), name, stat);
    }
    setVal("f1-race", html);
    setBadge("badge-f1race", "Live", "live");
  }).catch(function() {
    setVal("f1-race", '<div style="color:#f85149;font-size:0.85em">Fehler beim Laden</div>');
    setBadge("badge-f1race", "Fehler", "error");
  });

  // Fahrerwertung
  apiFetch(F1_BASE + "/current/driverStandings.json?limit=10").then(function(d) {
    var list = d.MRData.StandingsTable.StandingsLists[0];
    if (!list) throw new Error("no standings");
    var standings = list.DriverStandings.slice(0, 10);
    var html = "";
    for (var i = 0; i < standings.length; i++) {
      var s = standings[i];
      var name = s.Driver.givenName + " " + s.Driver.familyName;
      html += f1Row(parseInt(s.position), name, s.points + " Pts");
    }
    setVal("f1-driver", html);
    setBadge("badge-f1driver", "Live", "live");
  }).catch(function() {
    setVal("f1-driver", '<div style="color:#f85149;font-size:0.85em">Fehler beim Laden</div>');
    setBadge("badge-f1driver", "Fehler", "error");
  });

  // Konstrukteurswertung
  apiFetch(F1_BASE + "/current/constructorStandings.json?limit=10").then(function(d) {
    var list = d.MRData.StandingsTable.StandingsLists[0];
    if (!list) throw new Error("no standings");
    var standings = list.ConstructorStandings.slice(0, 10);
    var html = "";
    for (var i = 0; i < standings.length; i++) {
      var s = standings[i];
      html += f1Row(parseInt(s.position), s.Constructor.name, s.points + " Pts");
    }
    setVal("f1-constructor", html);
    setBadge("badge-f1constructor", "Live", "live");
  }).catch(function() {
    setVal("f1-constructor", '<div style="color:#f85149;font-size:0.85em">Fehler beim Laden</div>');
    setBadge("badge-f1constructor", "Fehler", "error");
  });
}

// ── Alles laden ──
function refreshAll() {
  var icon = document.getElementById("refreshIcon");
  if (icon) icon.classList.add("spinning");
  loadHeizoel();
  loadFX();
  loadGold();
  loadBTC();
  loadWeather();
  loadF1();
  setTimeout(function() {
    if (icon) icon.classList.remove("spinning");
    var t = document.getElementById("updateTime");
    if (t) t.textContent = "Zuletzt: " + getTime() + " Uhr";
  }, 4000);
}

refreshAll();
setInterval(refreshAll, 5 * 60 * 1000);
