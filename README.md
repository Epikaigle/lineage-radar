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

## Automatic refresh

The GitHub Actions workflow in `.github/workflows/update-data.yml` refreshes the dataset every **6 hours**, when the collector changes, or manually through `workflow_dispatch`.

It only commits `data/devices.json` when the generated data changed.

The frontend loads `./data/devices.json` relatively, so the project remains functional if the GitHub repository is renamed.

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
