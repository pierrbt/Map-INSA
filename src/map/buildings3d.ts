import * as maptalks from "maptalks";
import { BaseObject, ThreeLayer } from "maptalks.three";
import * as THREE from "three";

import type { BuildingFeature } from "../types";

type GeoCoordinate = [number, number];

export interface SearchableBuilding {
  name: string;
  shortName?: string;
}

export interface BuildingsLayerController {
  searchableBuildings: SearchableBuilding[];
  focusBuilding: (name: string) => boolean;
}

interface BuildingEntry {
  mesh: BaseObject;
  height: number;
}

export function createBuildingsLayer(
  map: maptalks.Map,
  buildings: BuildingFeature[],
): BuildingsLayerController {
  const searchableBuildings: SearchableBuilding[] = [];
  const centersByName = new Map<string, GeoCoordinate>();
  const entriesByName = new Map<string, BuildingEntry>();
  let openedInfoWindow: BaseObject | null = null;

  const showInfoWindow = (mesh: BaseObject, center: GeoCoordinate) => {
    if (openedInfoWindow && openedInfoWindow !== mesh) {
      openedInfoWindow.closeInfoWindow();
    }

    const infoWindow = mesh.getInfoWindow();
    if (!infoWindow) {
      return;
    }

    infoWindow.show(new maptalks.Coordinate(center[0], center[1]));
    openedInfoWindow = mesh;
  };

  const closeInfoWindow = () => {
    if (!openedInfoWindow) {
      return;
    }
    openedInfoWindow.closeInfoWindow();
    openedInfoWindow = null;
  };

  const animateSelection = (mesh: BaseObject, height: number) => {
    mesh.animateShow({ duration: 800 }, () => undefined);
    mesh.setHeight(height * 1.2);
    window.setTimeout(() => {
      mesh.setHeight(height);
    }, 250);
  };

  const animateMapTo = (center: GeoCoordinate) => {
    map.animateTo(
      { center: new maptalks.Coordinate(center[0], center[1]) },
      { duration: 500 },
    );
  };

  for (const feature of buildings) {
    const name = feature.properties?.name?.trim();
    if (!name) {
      continue;
    }

    centersByName.set(name, getFeatureCenter(feature));
    searchableBuildings.push({
      name,
      shortName: feature.properties?.short_name,
    });
  }

  const threeLayer = new ThreeLayer("3d-buildings", {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
  });

  threeLayer.prepareToDraw = (_gl, scene) => {
    const light = new THREE.DirectionalLight(0xf6efe4, 1);
    light.position.set(1, 0, 1);
    scene.add(light);

    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

    for (const building of buildings) {
      const height = getExtrusionHeight(building);
      const center = getFeatureCenter(building);
      const name = building.properties?.name?.trim();
      const mesh = threeLayer.toExtrudePolygon(
        building as unknown as maptalks.Polygon,
        {
          height,
          bloom: true,
        },
        material,
      );

      mesh.on("mouseover", (event: { target: BaseObject }) =>
        event.target.setHeight(height * 1.25),
      );
      mesh.on("mouseout", (event: { target: BaseObject }) =>
        event.target.setHeight(height),
      );
      mesh.on("click", () => {
        animateMapTo(center);
        animateSelection(mesh, height);
        if (name) {
          showInfoWindow(mesh, center);
        } else {
          closeInfoWindow();
        }
      });

      if (name) {
        mesh.setToolTip(name, {
          showTimeout: 0,
          eventsPropagation: true,
          dx: 15,
          dy: 15,
        });
        mesh.setInfoWindow({
          title: name,
          content: building.properties?.description || "Pas de description",
        });

        entriesByName.set(name, { mesh, height });
      }

      threeLayer.addMesh(mesh);
    }

    return [];
  };

  map.addLayer(threeLayer as unknown as maptalks.Layer);
  threeLayer.redraw();

  return {
    searchableBuildings,
    focusBuilding: (name) => {
      const center = centersByName.get(name);
      if (!center) {
        return false;
      }

      animateMapTo(center);

      const entry = entriesByName.get(name);
      if (!entry) {
        return true;
      }

      animateSelection(entry.mesh, entry.height);
      showInfoWindow(entry.mesh, center);

      return true;
    },
  };
}

function getExtrusionHeight(building: BuildingFeature): number {
  const height = Number(building.properties?.height ?? 0);
  if (!Number.isFinite(height) || height < 0) {
    return 0;
  }
  return height * 2;
}

function getFeatureCenter(building: BuildingFeature): GeoCoordinate {
  let minLng = Number.POSITIVE_INFINITY;
  let minLat = Number.POSITIVE_INFINITY;
  let maxLng = Number.NEGATIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;

  const geometry = building.geometry;

  if (geometry.type === "Polygon") {
    for (const ring of geometry.coordinates) {
      for (const [lng, lat] of ring) {
        minLng = Math.min(minLng, lng);
        minLat = Math.min(minLat, lat);
        maxLng = Math.max(maxLng, lng);
        maxLat = Math.max(maxLat, lat);
      }
    }
  } else {
    for (const polygon of geometry.coordinates) {
      for (const ring of polygon) {
        for (const [lng, lat] of ring) {
          minLng = Math.min(minLng, lng);
          minLat = Math.min(minLat, lat);
          maxLng = Math.max(maxLng, lng);
          maxLat = Math.max(maxLat, lat);
        }
      }
    }
  }

  return [(minLng + maxLng) / 2, (minLat + maxLat) / 2];
}
