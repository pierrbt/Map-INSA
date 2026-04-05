<h3 align="center">
  <img src="https://github.com/ClubInfoINSAT.png" width="100" alt="Logo" />
  <br/>
  Map-INSA
</h3>

<p align="center">
  <img src="./assets/images/preview.png" alt="Map-INSA preview"/>
</p>

Application 3D du campus INSA Toulouse, migree vers une stack moderne:

- Vite + TypeScript
- maptalks + maptalks.three + three
- source de donnees unique: `json/map.geojson`

## Lancer le projet

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
```

Preview locale du build:

```bash
npm run preview
```

## Ajouter / Modifier un batiment

- Rendez-vous sur [geojson.io](https://geojson.io/)
- Ouvrez le fichier [`json/map.geojson`](./json/map.geojson)
- Faites vos modifications puis sauvegardez le fichier

Proprietes attendues dans `properties`:

| name | short_name | description | height |
| ---- | ---------- | ----------- | ------ |
| string (optionnel) | string (optionnel) | string (optionnel) | number (requis) |

Pour recuperer la hauteur d'un batiment, vous pouvez utiliser [OSMBuildings](https://www.osmbuildings.org/).

## Deploiement

La configuration Vite utilise `base: './'` pour etre compatible avec:

- hebergement en sous-dossier sur serveur INSA
- affichage dans navigateur standard
- integration WebView dans une application mobile

