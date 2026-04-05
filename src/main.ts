import "maptalks/dist/maptalks.css";

import "./styles/main.css";

import { ABOUT_MODAL } from "./config";
import { getBuildings } from "./data";
import { createBuildingsLayer } from "./map/buildings3d";
import { createCampusMap } from "./map/createMap";
import { setupControls } from "./ui/controls";
import { createModalController } from "./ui/modal";
import { setupSearch } from "./ui/search";
import { getElementById } from "./utils/dom";

async function bootstrap(): Promise<void> {
  const buildings = await getBuildings();
  const map = createCampusMap("map");
  const buildingsLayer = createBuildingsLayer(map, buildings);

  const modal = createModalController();

  setupControls({
    map,
    onAboutClick: () => {
      modal.open(ABOUT_MODAL.title, ABOUT_MODAL.content);
    },
  });

  setupSearch({
    input: getElementById<HTMLInputElement>("searchInput"),
    suggestions: getElementById<HTMLUListElement>("suggestions"),
    searchableBuildings: buildingsLayer.searchableBuildings,
    onSelect: (buildingName) => {
      buildingsLayer.focusBuilding(buildingName);
    },
  });
}

bootstrap().catch((error) => {
  console.error(error);
});
