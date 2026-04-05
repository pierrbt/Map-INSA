import * as maptalks from "maptalks";

import { CAMPUS_EXTENT, MAP_CONFIG, TILE_SERVICE } from "../config";

export function createCampusMap(containerId: string): maptalks.Map {
  const map = new maptalks.Map(containerId, {
    center: MAP_CONFIG.center,
    zoom: MAP_CONFIG.zoom,
    minZoom: MAP_CONFIG.minZoom,
    maxZoom: MAP_CONFIG.maxZoom,
    pitch: MAP_CONFIG.pitch,
    bearing: MAP_CONFIG.bearing,
    baseLayer: new maptalks.TileLayer("tile", {
      urlTemplate: TILE_SERVICE.urlTemplate,
      subdomains: TILE_SERVICE.subdomains,
    }),
    attribution: {
      content:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
  });

  const extent = map.getExtent();
  extent.xmin = CAMPUS_EXTENT.xmin;
  extent.xmax = CAMPUS_EXTENT.xmax;
  extent.ymin = CAMPUS_EXTENT.ymin;
  extent.ymax = CAMPUS_EXTENT.ymax;
  map.setMaxExtent(extent);

  return map;
}
