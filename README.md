# Lineage Radar

**Lineage Radar** is a small, multilingual tracker for official LineageOS builds on **Xiaomi, Redmi and POCO** devices.

It answers one simple question: **which devices received the newest LineageOS builds?**

Devices are sorted by their latest available official build date, so a newly released build automatically moves that device toward the top of the list.

## Features

- Xiaomi / Redmi / POCO filters;
- automatic grouping by LineageOS codename;
- shared devices can belong to several brands at once;
- latest official build date;
- current LineageOS version and Android base;
- maintained / no longer maintained status;
- official LineageOS Wiki and download links;
- official device images when available;
- search and sorting;
- responsive layout;
- interface available in **English, French, Spanish and Simplified Chinese**;
- automatic browser-language detection with a manual language selector.

## Why the codename matters

Xiaomi-family naming is inconsistent across regions and generations. A single LineageOS codename can represent multiple commercial names, sometimes across Xiaomi, Redmi and POCO.

Lineage Radar therefore uses the **LineageOS codename as the canonical identity**, then merges commercial names and aliases around it.

## Maintenance status vs. downloadable builds

These are intentionally separate concepts.

**Maintained** means the codename is currently present in the official LineageOS build targets.

A device marked **No longer maintained** can still have older official builds available for download. Lineage Radar keeps showing the latest dated build it can retrieve, even after active maintenance ends.

## Official data sources

The collector in `scripts/update_data.py` aggregates public LineageOS sources:

- `LineageOS/hudson/updater/devices.json` for device names and codenames;
- `LineageOS/hudson/lineage-build-targets` for current build targets and branches;
- `LineageOS/lineage_wiki/_data/devices` for variants, models and images;
- `download.lineageos.org/api/v2/devices/<codename>/builds` for build dates, with a v1 fallback for older devices.

Codenames are preserved with their exact case because the download API is case-sensitive for identifiers such as `Mi8937`.

## LineageOS / Android mapping

| LineageOS | Android |
|---|---|
| 23.0 / 23.2 | 16 |
| 22.1 / 22.2 | 15 |
| 21 | 14 |
| 20 | 13 |
| 19.1 | 12L |
| 18.1 | 11 |
| 17.1 | 10 |

## Data updates without commits

The GitHub Actions workflow at `.github/workflows/update-data.yml` collects the public LineageOS sources every six hours, whenever the collector or site changes, or on demand.

The site is **deployed directly to GitHub Pages as an Actions artifact**. The collector still creates `data/devices.json` inside the temporary workflow runner, but **does not commit or push it to Git**. Visiting the site downloads the last published data; it never triggers a workflow, data rewrite, or Git commit.

**Deployment:** The first Actions artifact deployment has succeeded without changing the repository's Pages source. For a cleaner setup and to avoid a second, branch-based Pages build when source code changes, switch **Settings → Pages → Build and deployment → Source → GitHub Actions**. This is recommended rather than necessary for the currently working deployment. For an immediate refresh, use **Actions → Publish Lineage Radar to Pages → Run workflow**.

`app.js` fetches `./data/devices.json` from the deployed website; no Cloudflare account, backend, API tokens or per-visitor API fan-out is required.

The `data/devices.json` committed to `main` is a **legacy development / emergency fallback snapshot**, not the live dataset after enabling GitHub Actions deployment. New data is generated only in the temporary GitHub Actions runner and published with the site. Do not commit generated JSON when refreshing the site.

Why not fetch all APIs directly on every page load? This dataset merges multiple independent sources, including Wiki YAML metadata, and separately queries the build API for numerous device codenames. Browser requests can be blocked by CORS, would be slower, and duplicate load for each visitor. One generated JSON file in the deployment artifact avoids these problems and preserves support for discontinued devices.

## Local development

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

To regenerate data locally:

```bash
python -m pip install PyYAML==6.0.2
python scripts/update_data.py
```

## Project structure

```text
.
├── index.html
├── styles.css
├── app.js
├── logo.svg
├── data/
│   └── devices.json
├── scripts/
│   └── update_data.py
└── .github/workflows/
    └── update-data.yml
```

## Name

Project name: **Lineage Radar**

Recommended GitHub repository slug: **`lineage-radar`**

## Affiliation

Community project. Not affiliated with Xiaomi or LineageOS. Product names, images and source data belong to their respective owners.
