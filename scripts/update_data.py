#!/usr/bin/env python3
"""Build data/devices.json from official LineageOS public sources."""

from __future__ import annotations

import concurrent.futures
import datetime as dt
import json
import re
import subprocess
import tempfile
import urllib.request
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "data" / "devices.json"
HUDSON_DEVICES = "https://raw.githubusercontent.com/LineageOS/hudson/main/updater/devices.json"
BUILD_TARGETS = "https://raw.githubusercontent.com/LineageOS/hudson/main/lineage-build-targets"
BUILD_API = "https://download.lineageos.org/api/v2/devices/{codename}/builds"
BUILD_API_V1 = "https://download.lineageos.org/api/v1/{codename}/nightly"
WIKI_REPO = "https://github.com/LineageOS/lineage_wiki.git"
USER_AGENT = "xiaomi-lineageos-tracker/2.0 (+https://github.com/Epikaigle/xiaomi-lineageos)"

ANDROID_MAP = {
    "13.0": "6", "14.1": "7.1", "15.1": "8.1", "16.0": "9", "17.1": "10",
    "18.1": "11", "19.1": "12L", "20": "13", "21": "14", "22.1": "15",
    "22.2": "15", "23.0": "16", "23.2": "16",
}


def request(url: str, timeout: int = 30) -> bytes:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "application/json,text/plain,*/*",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as response:
        return response.read()


def get_json(url: str):
    return json.loads(request(url).decode("utf-8"))


def get_text(url: str) -> str:
    return request(url).decode("utf-8")


def version_key(value: str):
    return tuple(int(x) if x.isdigit() else 0 for x in re.findall(r"\d+", value))


def parse_targets(text: str) -> dict[str, dict[str, str]]:
    targets: dict[str, dict[str, str]] = {}
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split()
        if len(parts) < 4:
            continue
        codename, _, branch, cadence = parts[:4]
        version = branch.removeprefix("lineage-")
        targets[codename.lower()] = {"version": version, "cadence": cadence}
    return targets


def clone_wiki() -> tuple[Path, tempfile.TemporaryDirectory]:
    temp = tempfile.TemporaryDirectory()
    repo = Path(temp.name) / "lineage_wiki"
    subprocess.run(
        ["git", "clone", "--depth", "1", "--filter=blob:none", "--sparse", WIKI_REPO, str(repo)],
        check=True,
    )
    subprocess.run(
        ["git", "-C", str(repo), "sparse-checkout", "set", "_data/devices"],
        check=True,
    )
    return repo, temp


def wiki_metadata(repo: Path) -> dict[str, dict]:
    grouped: dict[str, list[dict]] = {}
    for path in (repo / "_data" / "devices").glob("*.yml"):
        try:
            data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        except Exception:
            continue
        codename = str(data.get("codename") or "").strip()
        if not codename or str(data.get("vendor") or "").lower() != "xiaomi":
            continue
        grouped.setdefault(codename.lower(), []).append(data)

    result: dict[str, dict] = {}
    for key, entries in grouped.items():
        names = []
        models = []
        image = None
        release = None
        versions = set()
        current_branch = None
        maintainers = set()
        for entry in entries:
            name = str(entry.get("name") or "").strip()
            if name and name not in names:
                names.append(name)
            for model in entry.get("models") or []:
                if str(model) not in models:
                    models.append(str(model))
            image = image or entry.get("image")
            release = release or entry.get("release")
            current_branch = current_branch or entry.get("current_branch")
            versions.update(str(v) for v in (entry.get("versions") or []))
            maintainers.update(str(v) for v in (entry.get("maintainers") or []))
        result[key] = {
            "names": names,
            "models": models,
            "image": image,
            "release": str(release) if release else None,
            "current_branch": str(current_branch) if current_branch else None,
            "versions": sorted(versions, key=version_key),
            "maintainers": sorted(maintainers),
        }
    return result


def brands_for(name: str, aliases: list[str]) -> list[str]:
    text = " / ".join([name, *aliases]).lower()
    has_poco = bool(re.search(r"\bpoco\b", text))
    has_redmi = bool(re.search(r"\bredmi\b", text))
    has_xiaomi_label = bool(re.search(r"\bxiaomi\b", text))
    has_mi_label = bool(re.search(r"\bmi\b", text))

    brands = []
    if has_xiaomi_label or has_mi_label or not (has_redmi or has_poco):
        brands.append("xiaomi")
    if has_redmi:
        brands.append("redmi")
    if has_poco:
        brands.append("poco")

    return brands


def date_from_filename(filename: str | None) -> int | None:
    if not filename:
        return None
    match = re.search(r"(?:^|[-_])(20\d{6})(?:[-_]|$)", filename)
    if not match:
        return None
    try:
        parsed = dt.datetime.strptime(match.group(1), "%Y%m%d").replace(
            tzinfo=dt.timezone.utc
        )
        return int(parsed.timestamp())
    except ValueError:
        return None


def build_timestamp(build: dict) -> int:
    for key in ("datetime", "timestamp"):
        value = build.get(key)
        if isinstance(value, (int, float)):
            return int(value)
        if isinstance(value, str) and value.isdigit():
            return int(value)

    date_value = build.get("date")
    if isinstance(date_value, str):
        try:
            return int(
                dt.datetime.fromisoformat(
                    date_value.replace("Z", "+00:00")
                ).timestamp()
            )
        except ValueError:
            pass

    return date_from_filename(build.get("filename")) or 0


def fetch_latest_build(codename: str) -> dict:
    builds = []
    source = "v2"

    try:
        payload = get_json(BUILD_API.format(codename=codename))
        if isinstance(payload, list):
            builds = payload
    except Exception:
        pass

    if not builds:
        source = "v1"
        try:
            payload = get_json(BUILD_API_V1.format(codename=codename))
            if isinstance(payload, list):
                builds = payload
        except Exception:
            pass

    if not builds:
        return {
            "last_build": None,
            "build_version": None,
            "build_type": None,
            "api": None,
        }

    latest = max(builds, key=build_timestamp)
    timestamp = build_timestamp(latest)
    build_date = (
        dt.datetime.fromtimestamp(timestamp, tz=dt.timezone.utc)
        .isoformat()
        .replace("+00:00", "Z")
        if timestamp
        else None
    )
    version = latest.get("version")
    build_type = (
        latest.get("type")
        or latest.get("romtype")
        or latest.get("channel")
    )

    return {
        "last_build": build_date,
        "build_version": str(version) if version else None,
        "build_type": build_type,
        "api": source,
    }


def main() -> None:
    hudson = get_json(HUDSON_DEVICES)
    targets = parse_targets(get_text(BUILD_TARGETS))

    wiki_repo, temp = clone_wiki()
    try:
        wiki = wiki_metadata(wiki_repo)
    finally:
        temp.cleanup()

    hudson_xiaomi = {
        str(device.get("model", "")).lower(): device
        for device in hudson
        if str(device.get("oem", "")).lower() == "xiaomi"
        and device.get("model")
    }
    codenames = sorted(set(hudson_xiaomi) | set(wiki))

    latest_by_code: dict[str, dict] = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        future_map = {
            pool.submit(fetch_latest_build, codename): codename
            for codename in codenames
        }
        for future in concurrent.futures.as_completed(future_map):
            codename = future_map[future]
            try:
                latest_by_code[codename] = future.result()
            except Exception:
                latest_by_code[codename] = {
                    "last_build": None,
                    "build_version": None,
                    "build_type": None,
                    "api": None,
                }

    devices = []
    for key in codenames:
        hudson_device = hudson_xiaomi.get(key, {})
        wiki_device = wiki.get(key, {})

        codename = str(hudson_device.get("model") or key)
        hudson_name = str(hudson_device.get("name") or "").strip()
        wiki_names = [
            str(name).strip()
            for name in wiki_device.get("names", [])
            if str(name).strip()
        ]
        name = hudson_name or (wiki_names[0] if wiki_names else codename)

        aliases = []
        for candidate in wiki_names:
            if candidate != name and candidate not in aliases:
                aliases.append(candidate)

        target = targets.get(key)
        build = latest_by_code.get(key, {})
        lineage_version = (
            (target or {}).get("version")
            or build.get("build_version")
            or wiki_device.get("current_branch")
        )
        if lineage_version:
            lineage_version = str(lineage_version)

        android_version = ANDROID_MAP.get(lineage_version or "")
        image_name = wiki_device.get("image") or f"{codename}.png"
        image_url = (
            "https://wiki.lineageos.org/images/devices/small/"
            f"{image_name}"
        )

        devices.append(
            {
                "codename": codename,
                "name": name,
                "aliases": aliases,
                "brands": brands_for(name, aliases),
                "status": "active" if target else "discontinued",
                "lineage_version": lineage_version,
                "android_version": android_version,
                "last_build": build.get("last_build"),
                "build_type": build.get("build_type"),
                "build_cadence": (target or {}).get("cadence"),
                "models": wiki_device.get("models", []),
                "release": wiki_device.get("release"),
                "image": image_url,
                "wiki_url": f"https://wiki.lineageos.org/devices/{codename}/",
                "download_url": (
                    f"https://download.lineageos.org/devices/{codename}"
                ),
            }
        )

    devices.sort(
        key=lambda device: (
            device.get("last_build") or "",
            version_key(device.get("lineage_version") or "0"),
            device.get("name") or "",
        ),
        reverse=True,
    )

    now = (
        dt.datetime.now(tz=dt.timezone.utc)
        .replace(microsecond=0)
        .isoformat()
        .replace("+00:00", "Z")
    )
    payload = {
        "generated_at": now,
        "sources": {
            "wiki": "https://github.com/LineageOS/lineage_wiki",
            "hudson": "https://github.com/LineageOS/hudson",
            "downloads": "https://download.lineageos.org",
        },
        "devices": devices,
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(devices)} Xiaomi-family devices to {OUTPUT}")


if __name__ == "__main__":
    main()
