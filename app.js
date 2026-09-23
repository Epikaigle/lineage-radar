const DATA_URL = "./data/devices.json";

const translations = {
  en: {
    pageTitle: "Lineage Radar — Xiaomi, Redmi & POCO LineageOS builds",
    metaDescription: "Track the latest official LineageOS builds for Xiaomi, Redmi and POCO devices.",
    languageLabel: "Language",
    skipToResults: "Skip to devices",
    githubLabel: "Open the Lineage Radar repository on GitHub in a new tab",
    resultsHeading: "LineageOS devices",
    opensNewTab: "opens in a new tab",
    heroTitle: "Latest LineageOS builds, at a glance.",
    heroCopy: "Track official LineageOS builds for Xiaomi, Redmi and POCO devices. When a new build lands, that device automatically rises to the top.",
    statDevices: "devices",
    statMaintained: "maintained",
    statRecent: "builds ≤ 14 days",
    statSync: "last sync",
    filtersAria: "Device filters",
    searchLabel: "Search for a phone or codename",
    searchPlaceholder: "Search: Mi 10, POCO F3, alioth…",
    sortLabel: "Sort",
    sortBuild: "Latest build",
    sortLineage: "LineageOS version",
    sortName: "Name A → Z",
    brandAria: "Brand",
    brandLabel: "Brand",
    all: "All",
    statusAria: "LineageOS status",
    statusLabel: "Status",
    maintained: "Maintained",
    notMaintained: "No longer maintained",
    loading: "Loading…",
    loadingData: "Loading LineageOS data.",
    reset: "Reset filters",
    howItWorks: "How it works",
    methodText: "Devices are grouped by their LineageOS codename, so one device can appear under Xiaomi, Redmi and POCO at the same time. The default ranking uses the date of the latest official build. “Maintained” means the codename is currently present in LineageOS build targets; older official builds may remain downloadable after maintenance ends.",
    sourcesText: "Sources: LineageOS Wiki, LineageOS Hudson and the LineageOS download API. Community project, not affiliated with Xiaomi or LineageOS.",
    communityProject: "Community project",
    noDatedBuild: "No dated build",
    today: "Today",
    lastBuild: "Last build",
    dateUnavailable: "Date unavailable",
    version: "Version",
    androidBase: "Android base",
    wiki: "Wiki",
    downloads: "Downloads",
    sortedBuild: "Sorted from newest build to oldest.",
    sortedLineage: "Sorted by descending LineageOS version.",
    sortedName: "Sorted by name.",
    noMatchTitle: "No matching device.",
    noMatchText: "Try another search or reset the filters.",
    dataUnavailable: "Data unavailable",
    dataUnavailableText: "The device data could not be loaded.",
    dataUnavailableCard: "LineageOS data is unavailable right now. Reload the page or check the GitHub Actions workflow.",
    collection: "LineageOS data",
    deviceSingular: "device",
    devicePlural: "devices"
  },
  fr: {
    pageTitle: "Lineage Radar — builds LineageOS Xiaomi, Redmi & POCO",
    metaDescription: "Suivez les dernières builds officielles LineageOS pour les appareils Xiaomi, Redmi et POCO.",
    languageLabel: "Langue",
    skipToResults: "Aller aux appareils",
    githubLabel: "Ouvrir le dépôt Lineage Radar sur GitHub dans un nouvel onglet",
    resultsHeading: "Appareils LineageOS",
    opensNewTab: "s’ouvre dans un nouvel onglet",
    heroTitle: "Les dernières builds LineageOS, en un coup d’œil.",
    heroCopy: "Suivez les builds officielles LineageOS des appareils Xiaomi, Redmi et POCO. Dès qu’une nouvelle build sort, l’appareil remonte automatiquement dans le classement.",
    statDevices: "appareils",
    statMaintained: "maintenus",
    statRecent: "builds ≤ 14 jours",
    statSync: "dernière synchro",
    filtersAria: "Filtres des appareils",
    searchLabel: "Rechercher un téléphone ou un codename",
    searchPlaceholder: "Rechercher : Mi 10, POCO F3, alioth…",
    sortLabel: "Tri",
    sortBuild: "Dernière build",
    sortLineage: "Version LineageOS",
    sortName: "Nom A → Z",
    brandAria: "Marque",
    brandLabel: "Gamme",
    all: "Tous",
    statusAria: "Statut LineageOS",
    statusLabel: "Statut",
    maintained: "Maintenu",
    notMaintained: "Plus maintenu",
    loading: "Chargement…",
    loadingData: "Chargement des données LineageOS.",
    reset: "Réinitialiser",
    howItWorks: "Comment ça marche",
    methodText: "Les appareils sont regroupés par codename LineageOS : un même appareil peut donc apparaître à la fois dans Xiaomi, Redmi et POCO. Le classement par défaut utilise la date de la dernière build officielle. « Maintenu » signifie que le codename figure actuellement dans les build targets LineageOS ; d’anciennes builds officielles peuvent rester téléchargeables après la fin de la maintenance.",
    sourcesText: "Sources : LineageOS Wiki, LineageOS Hudson et API de téléchargement LineageOS. Projet communautaire non affilié à Xiaomi ni à LineageOS.",
    communityProject: "Projet communautaire",
    noDatedBuild: "Aucune build datée",
    today: "Aujourd’hui",
    lastBuild: "Dernière build",
    dateUnavailable: "Date indisponible",
    version: "Version",
    androidBase: "Base Android",
    wiki: "Wiki",
    downloads: "Téléchargements",
    sortedBuild: "Classés du build le plus récent au plus ancien.",
    sortedLineage: "Classés par version LineageOS décroissante.",
    sortedName: "Classés par nom.",
    noMatchTitle: "Aucun appareil ne correspond.",
    noMatchText: "Essaie une autre recherche ou réinitialise les filtres.",
    dataUnavailable: "Données indisponibles",
    dataUnavailableText: "Impossible de charger les données des appareils.",
    dataUnavailableCard: "Les données LineageOS ne sont pas disponibles pour le moment. Recharge la page ou vérifie le workflow GitHub Actions.",
    collection: "Données LineageOS",
    deviceSingular: "appareil",
    devicePlural: "appareils"
  },
  es: {
    pageTitle: "Lineage Radar — builds LineageOS para Xiaomi, Redmi y POCO",
    metaDescription: "Sigue las últimas compilaciones oficiales de LineageOS para dispositivos Xiaomi, Redmi y POCO.",
    languageLabel: "Idioma",
    skipToResults: "Ir a los dispositivos",
    githubLabel: "Abrir el repositorio de Lineage Radar en GitHub en una pestaña nueva",
    resultsHeading: "Dispositivos LineageOS",
    opensNewTab: "se abre en una pestaña nueva",
    heroTitle: "Las últimas builds de LineageOS, de un vistazo.",
    heroCopy: "Sigue las builds oficiales de LineageOS para dispositivos Xiaomi, Redmi y POCO. Cuando aparece una nueva build, el dispositivo sube automáticamente en la lista.",
    statDevices: "dispositivos",
    statMaintained: "con soporte",
    statRecent: "builds ≤ 14 días",
    statSync: "última sincronización",
    filtersAria: "Filtros de dispositivos",
    searchLabel: "Buscar un teléfono o codename",
    searchPlaceholder: "Buscar: Mi 10, POCO F3, alioth…",
    sortLabel: "Ordenar",
    sortBuild: "Última build",
    sortLineage: "Versión de LineageOS",
    sortName: "Nombre A → Z",
    brandAria: "Marca",
    brandLabel: "Marca",
    all: "Todos",
    statusAria: "Estado de LineageOS",
    statusLabel: "Estado",
    maintained: "Con soporte",
    notMaintained: "Sin mantenimiento",
    loading: "Cargando…",
    loadingData: "Cargando datos de LineageOS.",
    reset: "Restablecer filtros",
    howItWorks: "Cómo funciona",
    methodText: "Los dispositivos se agrupan por su codename de LineageOS, por lo que un mismo dispositivo puede aparecer a la vez en Xiaomi, Redmi y POCO. El orden predeterminado usa la fecha de la última build oficial. «Con soporte» significa que el codename está actualmente en los build targets de LineageOS; las builds oficiales anteriores pueden seguir disponibles después de finalizar el mantenimiento.",
    sourcesText: "Fuentes: LineageOS Wiki, LineageOS Hudson y la API de descargas de LineageOS. Proyecto comunitario no afiliado a Xiaomi ni a LineageOS.",
    communityProject: "Proyecto comunitario",
    noDatedBuild: "Sin build fechada",
    today: "Hoy",
    lastBuild: "Última build",
    dateUnavailable: "Fecha no disponible",
    version: "Versión",
    androidBase: "Base Android",
    wiki: "Wiki",
    downloads: "Descargas",
    sortedBuild: "Ordenados de la build más reciente a la más antigua.",
    sortedLineage: "Ordenados por versión de LineageOS descendente.",
    sortedName: "Ordenados por nombre.",
    noMatchTitle: "No hay dispositivos coincidentes.",
    noMatchText: "Prueba otra búsqueda o restablece los filtros.",
    dataUnavailable: "Datos no disponibles",
    dataUnavailableText: "No se pudieron cargar los datos de los dispositivos.",
    dataUnavailableCard: "Los datos de LineageOS no están disponibles en este momento. Recarga la página o revisa el workflow de GitHub Actions.",
    collection: "Datos de LineageOS",
    deviceSingular: "dispositivo",
    devicePlural: "dispositivos"
  },
  zh: {
    pageTitle: "Lineage Radar — Xiaomi、Redmi 与 POCO 的 LineageOS 构建",
    metaDescription: "追踪 Xiaomi、Redmi 和 POCO 设备最新的官方 LineageOS 构建。",
    languageLabel: "语言",
    skipToResults: "跳转到设备列表",
    githubLabel: "在新标签页中打开 Lineage Radar GitHub 仓库",
    resultsHeading: "LineageOS 设备",
    opensNewTab: "在新标签页中打开",
    heroTitle: "最新 LineageOS 构建，一目了然。",
    heroCopy: "追踪 Xiaomi、Redmi 和 POCO 设备的官方 LineageOS 构建。发布新构建后，对应设备会自动升到列表顶部。",
    statDevices: "设备",
    statMaintained: "维护中",
    statRecent: "14 天内构建",
    statSync: "最近同步",
    filtersAria: "设备筛选",
    searchLabel: "搜索手机或 codename",
    searchPlaceholder: "搜索：Mi 10、POCO F3、alioth…",
    sortLabel: "排序",
    sortBuild: "最新构建",
    sortLineage: "LineageOS 版本",
    sortName: "名称 A → Z",
    brandAria: "品牌",
    brandLabel: "品牌",
    all: "全部",
    statusAria: "LineageOS 状态",
    statusLabel: "状态",
    maintained: "维护中",
    notMaintained: "已停止维护",
    loading: "加载中…",
    loadingData: "正在加载 LineageOS 数据。",
    reset: "重置筛选",
    howItWorks: "工作原理",
    methodText: "设备按 LineageOS codename 分组，因此同一设备可以同时出现在 Xiaomi、Redmi 和 POCO 分类中。默认按最新官方构建日期排序。“维护中”表示该 codename 当前仍在 LineageOS 的 build targets 中；停止维护后，较早的官方构建仍可能继续提供下载。",
    sourcesText: "数据来源：LineageOS Wiki、LineageOS Hudson 和 LineageOS 下载 API。本项目为社区项目，与 Xiaomi 或 LineageOS 无官方关联。",
    communityProject: "社区项目",
    noDatedBuild: "暂无构建日期",
    today: "今天",
    lastBuild: "最后构建",
    dateUnavailable: "日期不可用",
    version: "版本",
    androidBase: "Android 基础版本",
    wiki: "Wiki",
    downloads: "下载",
    sortedBuild: "按构建日期从新到旧排序。",
    sortedLineage: "按 LineageOS 版本从高到低排序。",
    sortedName: "按名称排序。",
    noMatchTitle: "没有匹配的设备。",
    noMatchText: "请尝试其他搜索词或重置筛选。",
    dataUnavailable: "数据不可用",
    dataUnavailableText: "无法加载设备数据。",
    dataUnavailableCard: "暂时无法获取 LineageOS 数据。请刷新页面或检查 GitHub Actions workflow。",
    collection: "LineageOS 数据",
    deviceSingular: "台设备",
    devicePlural: "台设备"
  }
};

const supportedLanguages = ["en", "fr", "es", "zh"];
const localeMap = { en: "en-US", fr: "fr-FR", es: "es-ES", zh: "zh-CN" };

function initialLanguage() {
  const requested = new URLSearchParams(location.search).get("lang");
  if (supportedLanguages.includes(requested)) return requested;
  try {
    const saved = localStorage.getItem("lineage-radar-language");
    if (supportedLanguages.includes(saved)) return saved;
  } catch (_) {}
  const browser = (navigator.language || "en").toLowerCase();
  if (browser.startsWith("fr")) return "fr";
  if (browser.startsWith("es")) return "es";
  if (browser.startsWith("zh")) return "zh";
  return "en";
}

const state = {
  devices: [],
  brand: "all",
  status: "all",
  query: "",
  sort: "build",
  generatedAt: null,
  lang: initialLanguage(),
  locale: "en-US"
};

const els = {
  grid: document.querySelector("#device-grid"),
  search: document.querySelector("#search"),
  sort: document.querySelector("#sort"),
  language: document.querySelector("#language"),
  brandFilters: document.querySelector("#brand-filters"),
  statusFilters: document.querySelector("#status-filters"),
  resultCount: document.querySelector("#result-count"),
  resultNote: document.querySelector("#result-note"),
  reset: document.querySelector("#reset"),
  statTotal: document.querySelector("#stat-total"),
  statActive: document.querySelector("#stat-active"),
  statRecent: document.querySelector("#stat-recent"),
  statSync: document.querySelector("#stat-sync"),
  footerUpdated: document.querySelector("#footer-updated")
};

let dateFormatter;
let relativeFormatter;
let collator;

function t(key) {
  return translations[state.lang]?.[key] ?? translations.en[key] ?? key;
}

function refreshIntl() {
  state.locale = localeMap[state.lang] || "en-US";
  dateFormatter = new Intl.DateTimeFormat(state.locale, { day: "2-digit", month: "short", year: "numeric" });
  relativeFormatter = new Intl.RelativeTimeFormat(state.locale, { numeric: "auto" });
  collator = new Intl.Collator(state.locale, { sensitivity: "base", numeric: true });
}

function applyStaticTranslations() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : state.lang;
  document.title = t("pageTitle");
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", t("metaDescription"));
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (ogTitle) ogTitle.setAttribute("content", t("pageTitle"));
  if (ogDescription) ogDescription.setAttribute("content", t("metaDescription"));
  if (twitterTitle) twitterTitle.setAttribute("content", t("pageTitle"));
  if (twitterDescription) twitterDescription.setAttribute("content", t("metaDescription"));

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    node.setAttribute("aria-label", t(node.dataset.i18nAria));
  });
  els.language.value = state.lang;
}

function setLanguage(lang, updateUrl = true) {
  if (!supportedLanguages.includes(lang)) return;
  state.lang = lang;
  try { localStorage.setItem("lineage-radar-language", lang); } catch (_) {}
  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState({}, "", url);
  }
  refreshIntl();
  applyStaticTranslations();
  updateStats();
  render();
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function parseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function daysSince(value) {
  const date = parseDate(value);
  return date ? Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000)) : null;
}

function relativeBuild(value) {
  const days = daysSince(value);
  if (days === null) return { label: t("noDatedBuild"), className: "unknown" };
  return {
    label: days === 0 ? t("today") : relativeFormatter.format(-days, "day"),
    className: days <= 14 ? "fresh" : days <= 45 ? "stale" : "old"
  };
}

function versionNumber(value) {
  const number = Number.parseFloat(String(value || "0"));
  return Number.isFinite(number) ? number : 0;
}

function brandLabel(brand) {
  return brand === "poco" ? "POCO" : brand.charAt(0).toUpperCase() + brand.slice(1);
}

function deviceCountLabel(count) {
  if (state.lang === "zh") return count + " " + t("devicePlural");
  return count + " " + (count === 1 ? t("deviceSingular") : t("devicePlural"));
}

function filteredDevices() {
  const query = state.query.trim().toLocaleLowerCase(state.locale);
  const devices = state.devices.filter((device) => {
    if (state.brand !== "all" && !(device.brands || []).includes(state.brand)) return false;
    if (state.status !== "all" && device.status !== state.status) return false;
    if (!query) return true;
    return [device.name, device.codename]
      .concat(device.aliases || [], device.models || [])
      .join(" ")
      .toLocaleLowerCase(state.locale)
      .includes(query);
  });

  devices.sort((a, b) => {
    if (state.sort === "name") return collator.compare(a.name || a.codename, b.name || b.codename);
    if (state.sort === "lineage") {
      return versionNumber(b.lineage_version) - versionNumber(a.lineage_version)
        || collator.compare(a.name || a.codename, b.name || b.codename);
    }
    const aDate = parseDate(a.last_build)?.getTime() || 0;
    const bDate = parseDate(b.last_build)?.getTime() || 0;
    return bDate - aDate
      || versionNumber(b.lineage_version) - versionNumber(a.lineage_version)
      || collator.compare(a.name || a.codename, b.name || b.codename);
  });

  return devices;
}

function cardTemplate(device, index) {
  const build = relativeBuild(device.last_build);
  const parsed = parseDate(device.last_build);
  const exactDate = parsed ? dateFormatter.format(parsed) : t("dateUnavailable");
  const badges = (device.brands || ["xiaomi"])
    .map((brand) => '<span class="badge">' + escapeHtml(brandLabel(brand)) + "</span>")
    .join("");
  const active = device.status === "active";
  const image = escapeHtml(device.image || ("https://wiki.lineageos.org/images/devices/small/" + encodeURIComponent(device.codename) + ".png"));
  const titleId = "device-" + encodeURIComponent(device.codename);
  const loading = index < 6 ? "eager" : "lazy";
  const fetchPriority = index < 3 ? ' fetchpriority="high"' : "";
  const datetime = parsed ? ' datetime="' + escapeHtml(parsed.toISOString()) + '"' : "";
  const wikiLabel = t("wiki") + ": " + (device.name || device.codename) + " — " + t("opensNewTab");
  const downloadLabel = t("downloads") + ": " + (device.name || device.codename) + " — " + t("opensNewTab");

  return '<article class="device-card" aria-labelledby="' + titleId + '">' +
    '<div class="card-top"><div class="device-image-wrap">' +
      '<img class="device-image" src="' + image + '" alt="" width="82" height="104" loading="' + loading + '" decoding="async"' + fetchPriority + ' onerror="this.parentElement.classList.add(\'is-fallback\')">' +
      '<span class="image-fallback" aria-hidden="true"></span></div><div class="card-content">' +
      '<div class="badges">' + badges + '<span class="badge ' + (active ? "active" : "discontinued") + '">' + escapeHtml(active ? t("maintained") : t("notMaintained")) + "</span></div>" +
      '<h3 class="card-title" id="' + titleId + '">' + escapeHtml(device.name || device.codename) + "</h3>" +
      '<p class="codename">' + escapeHtml(device.codename) + "</p>" +
      '<div class="build-age ' + build.className + '">' + escapeHtml(build.label) + "</div>" +
      '<time class="build-date"' + datetime + '>' + escapeHtml(t("lastBuild")) + ": " + escapeHtml(exactDate) + "</time></div></div>" +
    '<div class="card-meta"><div class="meta-item"><span>' + escapeHtml(t("version")) + "</span><strong>" + (device.lineage_version ? "LineageOS " + escapeHtml(device.lineage_version) : "—") + "</strong></div>" +
      '<div class="meta-item"><span>' + escapeHtml(t("androidBase")) + "</span><strong>" + (device.android_version ? "Android " + escapeHtml(device.android_version) : "—") + "</strong></div></div>" +
    '<div class="card-actions"><a href="' + escapeHtml(device.wiki_url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + escapeHtml(wikiLabel) + '">' + escapeHtml(t("wiki")) + " ↗</a>" +
      '<a href="' + escapeHtml(device.download_url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + escapeHtml(downloadLabel) + '">' + escapeHtml(t("downloads")) + " ↗</a></div></article>";
}

function render() {
  if (!state.devices.length) return;
  const devices = filteredDevices();
  els.grid.setAttribute("aria-busy", "false");
  els.resultCount.textContent = deviceCountLabel(devices.length);
  els.resultNote.textContent = state.sort === "build"
    ? t("sortedBuild")
    : state.sort === "lineage"
      ? t("sortedLineage")
      : t("sortedName");
  els.reset.hidden = state.brand === "all" && state.status === "all" && !state.query && state.sort === "build";
  els.grid.innerHTML = devices.length
    ? devices.map((device, index) => cardTemplate(device, index)).join("")
    : '<div class="empty-state"><strong>' + escapeHtml(t("noMatchTitle")) + "</strong>" + escapeHtml(t("noMatchText")) + "</div>";
}

function updateStats() {
  if (!state.devices.length) return;
  const active = state.devices.filter((device) => device.status === "active").length;
  const recent = state.devices.filter((device) => {
    const days = daysSince(device.last_build);
    return days !== null && days <= 14;
  }).length;

  els.statTotal.textContent = state.devices.length;
  els.statActive.textContent = active;
  els.statRecent.textContent = recent;

  document.querySelectorAll("[data-count]").forEach((node) => {
    const brand = node.dataset.count;
    node.textContent = brand === "all"
      ? state.devices.length
      : state.devices.filter((device) => (device.brands || []).includes(brand)).length;
  });

  const generated = parseDate(state.generatedAt);
  if (generated) {
    const days = Math.max(0, Math.floor((Date.now() - generated.getTime()) / 86400000));
    els.statSync.textContent = days === 0 ? t("today") : relativeFormatter.format(-days, "day");
    els.footerUpdated.textContent = t("collection") + ": " + dateFormatter.format(generated);
  } else {
    els.statSync.textContent = "—";
    els.footerUpdated.textContent = t("dateUnavailable");
  }
}

function activateButton(container, selector, value) {
  container.querySelectorAll("button").forEach((button) => {
    const active = button.matches("[" + selector + '=\'' + value + "\']");
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function resetFilters() {
  Object.assign(state, { brand: "all", status: "all", query: "", sort: "build" });
  els.search.value = "";
  els.sort.value = "build";
  activateButton(els.brandFilters, "data-brand", "all");
  activateButton(els.statusFilters, "data-status", "all");
  render();
}

async function loadData() {
  try {
    const response = await fetch(DATA_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const payload = await response.json();
    if (!Array.isArray(payload.devices)) throw new Error("Invalid device data");
    state.devices = payload.devices;
    state.generatedAt = payload.generated_at;
    updateStats();
    render();
  } catch (error) {
    console.error(error);
    els.grid.setAttribute("aria-busy", "false");
    els.resultCount.textContent = t("dataUnavailable");
    els.resultNote.textContent = t("dataUnavailableText");
    els.grid.innerHTML = '<div class="error-state"><strong>' + escapeHtml(t("dataUnavailable")) + "</strong>" + escapeHtml(t("dataUnavailableCard")) + "</div>";
  }
}

refreshIntl();
applyStaticTranslations();

els.language.addEventListener("change", (event) => setLanguage(event.target.value));
els.search.addEventListener("input", (event) => { state.query = event.target.value; render(); });
els.sort.addEventListener("change", (event) => { state.sort = event.target.value; render(); });
els.brandFilters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-brand]");
  if (!button) return;
  state.brand = button.dataset.brand;
  activateButton(els.brandFilters, "data-brand", state.brand);
  render();
});
els.statusFilters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-status]");
  if (!button) return;
  state.status = button.dataset.status;
  activateButton(els.statusFilters, "data-status", state.status);
  render();
});
els.reset.addEventListener("click", resetFilters);

loadData();
