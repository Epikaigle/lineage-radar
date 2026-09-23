const DATA_URL = "https://raw.githubusercontent.com/Epikaigle/xiaomi-lineageos/main/data/devices.json";
const state = { devices: [], brand: "all", status: "all", query: "", sort: "build", generatedAt: null };
const els = {
  grid: document.querySelector("#device-grid"), search: document.querySelector("#search"), sort: document.querySelector("#sort"),
  brandFilters: document.querySelector("#brand-filters"), statusFilters: document.querySelector("#status-filters"),
  resultCount: document.querySelector("#result-count"), resultNote: document.querySelector("#result-note"), reset: document.querySelector("#reset"),
  statTotal: document.querySelector("#stat-total"), statActive: document.querySelector("#stat-active"), statRecent: document.querySelector("#stat-recent"),
  statSync: document.querySelector("#stat-sync"), footerUpdated: document.querySelector("#footer-updated")
};
const collator = new Intl.Collator("fr", { sensitivity: "base", numeric: true });
const dateFormatter = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
const relativeFormatter = new Intl.RelativeTimeFormat("fr-FR", { numeric: "auto" });

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}
function parseDate(value) { if (!value) return null; const d = new Date(value); return Number.isNaN(d.getTime()) ? null : d; }
function daysSince(value) { const d = parseDate(value); return d ? Math.max(0, Math.floor((Date.now() - d.getTime()) / 86400000)) : null; }
function relativeBuild(value) {
  const days = daysSince(value);
  if (days === null) return { label: "Aucune build datée", className: "unknown" };
  return { label: days === 0 ? "Aujourd’hui" : relativeFormatter.format(-days, "day"), className: days <= 14 ? "fresh" : days <= 45 ? "stale" : "old" };
}
function versionNumber(value) { const n = Number.parseFloat(String(value || "0")); return Number.isFinite(n) ? n : 0; }
function brandLabel(brand) { return brand === "poco" ? "POCO" : brand.charAt(0).toUpperCase() + brand.slice(1); }

function filteredDevices() {
  const query = state.query.trim().toLocaleLowerCase("fr");
  const devices = state.devices.filter((device) => {
    if (state.brand !== "all" && !(device.brands || []).includes(state.brand)) return false;
    if (state.status !== "all" && device.status !== state.status) return false;
    if (!query) return true;
    return [device.name, device.codename].concat(device.aliases || [], device.models || []).join(" ").toLocaleLowerCase("fr").includes(query);
  });
  devices.sort((a, b) => {
    if (state.sort === "name") return collator.compare(a.name || a.codename, b.name || b.codename);
    if (state.sort === "lineage") return versionNumber(b.lineage_version) - versionNumber(a.lineage_version) || collator.compare(a.name || a.codename, b.name || b.codename);
    const aDate = parseDate(a.last_build)?.getTime() || 0, bDate = parseDate(b.last_build)?.getTime() || 0;
    return bDate - aDate || versionNumber(b.lineage_version) - versionNumber(a.lineage_version) || collator.compare(a.name || a.codename, b.name || b.codename);
  });
  return devices;
}

function cardTemplate(device) {
  const build = relativeBuild(device.last_build), parsed = parseDate(device.last_build);
  const exactDate = parsed ? dateFormatter.format(parsed) : "Date indisponible";
  const badges = (device.brands || ["xiaomi"]).map((b) => '<span class="badge">' + escapeHtml(brandLabel(b)) + '</span>').join("");
  const active = device.status === "active";
  const image = escapeHtml(device.image || ("https://wiki.lineageos.org/images/devices/small/" + encodeURIComponent(device.codename) + ".png"));
  return '<article class="device-card">' +
    '<div class="card-top"><div class="device-image-wrap">' +
      '<img class="device-image" src="' + image + '" alt="' + escapeHtml(device.name) + '" loading="lazy" decoding="async" onerror="this.parentElement.classList.add(\'is-fallback\')">' +
      '<span class="image-fallback" aria-hidden="true"></span></div><div>' +
      '<div class="badges">' + badges + '<span class="badge ' + (active ? 'active' : 'discontinued') + '">' + (active ? 'Maintenu' : 'Plus maintenu') + '</span></div>' +
      '<h2 class="card-title">' + escapeHtml(device.name || device.codename) + '</h2>' +
      '<p class="codename">' + escapeHtml(device.codename) + '</p>' +
      '<div class="build-age ' + build.className + '">' + escapeHtml(build.label) + '</div>' +
      '<span class="build-date">Dernière build : ' + escapeHtml(exactDate) + '</span></div></div>' +
    '<div class="card-meta"><div class="meta-item"><span>Version</span><strong>' + (device.lineage_version ? 'LineageOS ' + escapeHtml(device.lineage_version) : '—') + '</strong></div>' +
      '<div class="meta-item"><span>Base Android</span><strong>' + (device.android_version ? 'Android ' + escapeHtml(device.android_version) : '—') + '</strong></div></div>' +
    '<div class="card-actions"><a href="' + escapeHtml(device.wiki_url) + '" target="_blank" rel="noreferrer">Wiki ↗</a>' +
      '<a href="' + escapeHtml(device.download_url) + '" target="_blank" rel="noreferrer">Téléchargements ↗</a></div></article>';
}

function render() {
  const devices = filteredDevices(); els.grid.setAttribute("aria-busy", "false");
  els.resultCount.textContent = devices.length + " appareil" + (devices.length > 1 ? "s" : "");
  els.resultNote.textContent = state.sort === "build" ? "Classés du build le plus récent au plus ancien." : state.sort === "lineage" ? "Classés par version LineageOS décroissante." : "Classés par nom.";
  els.reset.hidden = state.brand === "all" && state.status === "all" && !state.query && state.sort === "build";
  els.grid.innerHTML = devices.length ? devices.map(cardTemplate).join("") : '<div class="empty-state"><strong>Aucun appareil ne correspond.</strong>Essaie une autre recherche ou réinitialise les filtres.</div>';
}
function updateStats() {
  const active = state.devices.filter((d) => d.status === "active").length;
  const recent = state.devices.filter((d) => { const days = daysSince(d.last_build); return days !== null && days <= 14; }).length;
  els.statTotal.textContent = state.devices.length; els.statActive.textContent = active; els.statRecent.textContent = recent;
  document.querySelectorAll("[data-count]").forEach((node) => { const b = node.dataset.count; node.textContent = b === "all" ? state.devices.length : state.devices.filter((d) => (d.brands || []).includes(b)).length; });
  const generated = parseDate(state.generatedAt);
  if (generated) {
    const days = Math.max(0, Math.floor((Date.now() - generated.getTime()) / 86400000));
    els.statSync.textContent = days === 0 ? "Aujourd’hui" : relativeFormatter.format(-days, "day");
    els.footerUpdated.textContent = "Collecte LineageOS : " + dateFormatter.format(generated);
  } else { els.statSync.textContent = "—"; els.footerUpdated.textContent = "Date de collecte indisponible"; }
}
function activateButton(container, selector, value) { container.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b.matches("[" + selector + '=\"' + value + '\"]'))); }
function resetFilters() {
  Object.assign(state, { brand: "all", status: "all", query: "", sort: "build" }); els.search.value = ""; els.sort.value = "build";
  activateButton(els.brandFilters, "data-brand", "all"); activateButton(els.statusFilters, "data-status", "all"); render();
}
async function loadData() {
  try {
    const response = await fetch(DATA_URL + "?v=" + Date.now(), { cache: "no-store" });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const payload = await response.json(); if (!Array.isArray(payload.devices)) throw new Error("Format de données invalide");
    state.devices = payload.devices; state.generatedAt = payload.generated_at; updateStats(); render();
  } catch (error) {
    console.error(error); els.grid.setAttribute("aria-busy", "false"); els.resultCount.textContent = "Données indisponibles";
    els.resultNote.textContent = "Impossible de charger le fichier de données pour le moment.";
    els.grid.innerHTML = '<div class="error-state"><strong>La collecte LineageOS n’est pas disponible.</strong>Recharge la page ou vérifie le workflow GitHub Actions.</div>';
  }
}
els.search.addEventListener("input", (e) => { state.query = e.target.value; render(); });
els.sort.addEventListener("change", (e) => { state.sort = e.target.value; render(); });
els.brandFilters.addEventListener("click", (e) => { const b = e.target.closest("button[data-brand]"); if (!b) return; state.brand = b.dataset.brand; activateButton(els.brandFilters, "data-brand", state.brand); render(); });
els.statusFilters.addEventListener("click", (e) => { const b = e.target.closest("button[data-status]"); if (!b) return; state.status = b.dataset.status; activateButton(els.statusFilters, "data-status", state.status); render(); });
els.reset.addEventListener("click", resetFilters);
loadData();
