import type {
  Feature,
  FeatureCollection,
  MultiPolygon,
  Polygon,
} from "geojson";

export interface BuildingProperties {
  name?: string;
  short_name?: string;
  description?: string;
  height: number;
}

export type BuildingGeometry = Polygon | MultiPolygon;

export type BuildingFeature = Feature<BuildingGeometry, BuildingProperties>;

export type BuildingsGeoJson = FeatureCollection<
  BuildingGeometry,
  BuildingProperties
>;
