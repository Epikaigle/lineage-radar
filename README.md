# Xiaomi × LineageOS Build Tracker

Site statique qui classe les appareils **Xiaomi, Redmi et POCO** selon la date de leur dernière build officielle LineageOS.

➡️ **Site : https://epikaigle.github.io/xiaomi-lineageos/**

## Objectif

Les appareils Xiaomi ne sont pas nommés de façon uniforme dans les différentes sources : certains s'appellent Mi, d'autres simplement 12 ou 13, tandis qu'un même codename peut être vendu à la fois sous un nom **Redmi**, **POCO** et parfois **Mi/Xiaomi**.

Le tracker travaille donc d'abord avec le **codename LineageOS**, puis regroupe les noms commerciaux et les alias. Un appareil peut appartenir à plusieurs filtres à la fois.

Le classement par défaut répond à une question simple : **quel appareil a reçu la build LineageOS la plus récente ?** Lorsqu'une nouvelle build sort, sa date est récupérée automatiquement et l'appareil remonte dans la liste.

## Données affichées

Pour chaque appareil :

- nom commercial et alias ;
- codename LineageOS ;
- gamme Xiaomi / Redmi / POCO ;
- photo provenant du wiki LineageOS ;
- statut actuel dans les build targets officiels ;
- version LineageOS ;
- version Android correspondante ;
- date de la dernière build disponible ;
- liens vers le wiki et le portail de téléchargement LineageOS.

## Sources officielles

Le script scripts/update_data.py agrège uniquement des sources publiques LineageOS :

- LineageOS/hudson/updater/devices.json pour les noms et codenames ;
- LineageOS/hudson/lineage-build-targets pour savoir quels appareils ont encore des builds programmées et sur quelle branche ;
- LineageOS/lineage_wiki/_data/devices pour les variantes, modèles et images ;
- download.lineageos.org/api/v2/devices/<codename>/builds pour les dates de builds, avec un fallback vers l'API v1 pour les appareils plus anciens.

| LineageOS | Android |
|---|---|
| 23.0 / 23.2 | 16 |
| 22.1 / 22.2 | 15 |
| 21 | 14 |
| 20 | 13 |
| 19.1 | 12L |
| 18.1 | 11 |
| 17.1 | 10 |

Cette table reprend la correspondance utilisée par le wiki officiel LineageOS.

## Mise à jour automatique

Le workflow .github/workflows/update-data.yml s'exécute toutes les **6 heures**, lors d'une modification du script de collecte, ou manuellement via workflow_dispatch.

Il régénère data/devices.json puis ne crée un commit que si les données ont réellement changé.

Le front charge volontairement la version raw de data/devices.json sur la branche main. Ainsi, les nouvelles dates de build sont visibles sur le site sans dépendre du cache d'un nouveau build GitHub Pages.

## GitHub Pages

Le site ne nécessite ni framework, ni Node.js, ni serveur : index.html, styles.css et app.js sont directement publiables par GitHub Pages.

Le dépôt est prévu pour être servi depuis la branche main, à la racine. Une fois GitHub Pages activé sur cette source, chaque modification du site est redéployée automatiquement à l'URL du projet.

## Développement local

Lancer :

    python -m http.server 8000

Puis ouvrir http://localhost:8000.

Pour régénérer les données localement :

    python -m pip install PyYAML==6.0.2
    python scripts/update_data.py

## Structure

    .
    ├── index.html
    ├── styles.css
    ├── app.js
    ├── data/
    │   └── devices.json
    ├── scripts/
    │   └── update_data.py
    └── .github/workflows/
        └── update-data.yml

## Licence / affiliation

Projet communautaire non affilié à Xiaomi ni à LineageOS. Les marques, noms d'appareils, images et données restent la propriété de leurs détenteurs respectifs.


### Codenames et statut

Les codenames LineageOS sont traités en respectant leur casse exacte (par exemple `Mi8937`). Le statut **Maintenu** signifie que l’appareil figure dans les build targets actuels de LineageOS. Un appareil **Plus maintenu** peut encore avoir d’anciennes builds officielles disponibles ; dans ce cas, leur dernière date connue reste affichée.
