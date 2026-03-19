* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: #0d1117;
  color: #e6edf3;
  padding: 24px;
  min-height: 100vh;
}

/* ── Header ── */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 1px solid #21262d;
}

header h1 {
  font-size: 1.3em;
  font-weight: 600;
  color: #e6edf3;
  display: flex;
  align-items: center;
  gap: 10px;
}

.pulse {
  width: 9px;
  height: 9px;
  background: #3fb950;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 #3fb95066; }
  50%       { opacity: 0.7; box-shadow: 0 0 0 5px #3fb95000; }
}

.last-update {
  font-size: 0.75em;
  color: #6e7681;
}

/* ── Grid & Cards ── */
.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.card {
  background: #161b22;
  border: 1px solid #21262d;
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s, transform 0.2s;
}

.card:hover {
  border-color: #388bfd44;
  transform: translateY(-2px);
}

.card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  border-radius: 12px 12px 0 0;
}

.card.blue::before   { background: linear-gradient(90deg, #388bfd, #1f6feb); }
.card.green::before  { background: linear-gradient(90deg, #3fb950, #2ea043); }
.card.orange::before { background: linear-gradient(90deg, #f0883e, #d29922); }
.card.purple::before { background: linear-gradient(90deg, #bc8cff, #8957e5); }

/* ── Card Header ── */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #7d8590;
}

.icon { font-size: 1em; }

/* ── Badges ── */
.badge {
  font-size: 0.68em;
  padding: 2px 8px;
  border-radius: 20px;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.badge.live    { background: #3fb95022; color: #3fb950; }
.badge.loading { background: #d2992222; color: #d29922; animation: blink 1.4s infinite; }
.badge.error   { background: #f8514922; color: #f85149; }

@keyframes blink { 50% { opacity: 0.4; } }

/* ── Values ── */
.main-value {
  font-size: 2em;
  font-weight: 700;
  color: #e6edf3;
  line-height: 1.1;
  margin-bottom: 6px;
}

.sub-value {
  font-size: 0.85em;
  color: #7d8590;
  line-height: 1.6;
}

.change {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.78em;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 6px;
  margin-top: 6px;
}

.change.up      { background: #3fb95020; color: #3fb950; }
.change.down    { background: #f8514920; color: #f85149; }
.change.neutral { background: #21262d;   color: #6e7681; }

/* ── Weather ── */
.weather-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.weather-icon {
  font-size: 2.8em;
  line-height: 1;
}

.weather-details { flex: 1; }

.city-input-row {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}

.city-input-row input {
  flex: 1;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 6px 10px;
  color: #e6edf3;
  font-size: 0.82em;
  outline: none;
}

.city-input-row input:focus {
  border-color: #388bfd;
}

.city-input-row button {
  background: #21262d;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 6px 12px;
  color: #e6edf3;
  font-size: 0.82em;
  cursor: pointer;
  transition: background 0.15s;
}

.city-input-row button:hover {
  background: #30363d;
}

/* ── Skeleton Loader ── */
.skeleton {
  height: 2em;
  background: linear-gradient(90deg, #21262d 25%, #30363d 50%, #21262d 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
  margin-top: 4px;
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Refresh Button ── */
.refresh-btn {
  background: none;
  border: 1px solid #30363d;
  border-radius: 6px;
  color: #7d8590;
  padding: 5px 10px;
  font-size: 0.78em;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.refresh-btn:hover {
  background: #21262d;
  color: #e6edf3;
}

.spinning { animation: spin 1s linear infinite; }

@keyframes spin { to { transform: rotate(360deg); } }

/* ── Footer ── */
.footer {
  margin-top: 24px;
  text-align: center;
  font-size: 0.72em;
  color: #3d444d;
}
