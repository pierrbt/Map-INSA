export const MAP_CONFIG = {
  center: [1.468, 43.5696] as [number, number],
  zoom: 18,
  minZoom: 18,
  maxZoom: 20,
  pitch: 45,
  bearing: 0,
};

export const CAMPUS_EXTENT = {
  xmin: 1.464,
  xmax: 1.4715,
  ymin: 43.567,
  ymax: 43.574,
};

export const TILE_SERVICE = {
  urlTemplate: "https://tile.f4map.com/tiles/f4_3d/{z}/{x}/{y}.png",
  subdomains: ["a", "b", "c", "d"],
};

export const ABOUT_MODAL = {
  title: "A Propos",
  content:
    "<p>Ce projet a &eacute;t&eacute; r&eacute;alis&eacute; par des membres du Club Info de l'INSA Toulouse. Il a pour but de vous permettre de d&eacute;couvrir le campus de l'INSA Toulouse en 3D.</p><p>Pour plus d'informations, n'h&eacute;sitez pas &agrave; contacter le <a href='https://discord.gg/9G8cWyK'>Club Info</a>.</p><p>Toute contribution est la bienvenue, vous pouvez retrouver le code source du site sur notre <a href='https://github.com/ClubInfoInsaT/Map-INSA'>GitHub</a>.</p>",
};
