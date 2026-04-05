import * as maptalks from "maptalks";

import { MAP_CONFIG } from "../config";
import { getElementById } from "../utils/dom";

interface ControlsOptions {
  map: maptalks.Map;
  onAboutClick: () => void;
}

export function setupControls(options: ControlsOptions): void {
  const { map, onAboutClick } = options;

  const resetButton = getElementById<HTMLButtonElement>("resetControl");
  const zoomInButton = getElementById<HTMLButtonElement>("zoomInControl");
  const zoomOutButton = getElementById<HTMLButtonElement>("zoomOutControl");
  const aboutButton = getElementById<HTMLButtonElement>("aboutControl");

  resetButton.addEventListener("click", () => {
    map.setCenter(
      new maptalks.Coordinate(MAP_CONFIG.center[0], MAP_CONFIG.center[1]),
    );
    map.setZoom(MAP_CONFIG.zoom);
    map.setPitch(MAP_CONFIG.pitch);
    map.setBearing(MAP_CONFIG.bearing);
  });

  zoomInButton.addEventListener("click", () => {
    map.setZoom(map.getZoom() + 0.5);
  });

  zoomOutButton.addEventListener("click", () => {
    map.setZoom(map.getZoom() - 0.5);
  });

  aboutButton.addEventListener("click", onAboutClick);
}
