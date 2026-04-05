import type { BuildingFeature, BuildingsGeoJson } from "./types";

export async function getBuildings(): Promise<BuildingFeature[]> {
  const response = await fetch(`${import.meta.env.BASE_URL}map.geojson`);
  if (!response.ok) {
    throw new Error("Unable to load map.geojson");
  }

  const payload = (await response.json()) as BuildingsGeoJson;
  return payload.features;
}
