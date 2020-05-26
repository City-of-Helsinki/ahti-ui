import { default as GeoJSON, LineString, Point } from 'geojson';

import { LngLat } from '../../../../alltypes';
import mapStyle from '../../../assets/mapStyle.json';
import { Feature } from '../../../domain/api/generated/types.d';

export const getFlyToPoint = (feature: any): LngLat | undefined => {
  if (!feature || !feature.geometry) {
    return undefined;
  }

  const geometry = feature.geometry;
  if (geometry.type === 'LineString') {
    return {
      longitude: geometry.coordinates[0][0],
      latitude: geometry.coordinates[0][1],
    };
  }
  if (feature.geometry.type === 'Point') {
    return {
      longitude: geometry.coordinates[0],
      latitude: geometry.coordinates[1],
    };
  }

  return undefined;
};

export const getPoints = (features: Feature[]) => {
  return features
    .filter((feature) => feature.geometry.type === 'Point')
    .map((feature) => {
      return {
        id: feature.id,
        type: 'Feature' as 'Feature',
        properties: {
          cluster: false,
          itemId: feature?.properties?.ahtiId,
          category: feature?.properties?.category?.id,
        },
        geometry: {
          type: 'Point' as 'Point',
          coordinates: [
            feature.geometry.coordinates[0],
            feature.geometry.coordinates[1],
          ],
        },
      };
    });
};

export const getRoutes = (
  features: Feature[],
  selectedFeature?: Feature
): GeoJSON.FeatureCollection<GeoJSON.LineString> => {
  const getRouteColor = (category: string): string => {
    if (category === 'ahti:category:ferry') {
      return '#0072c6';
    }
    return '#000';
  };

  return {
    type: 'FeatureCollection',
    features: features
      .filter((feature) => feature.geometry.type === 'LineString')
      .map((feature) => {
        return {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: feature.geometry.coordinates,
          },
          properties: {
            ahtiId: feature.properties.ahtiId,
            name: feature.properties.name,
            selected:
              selectedFeature &&
              feature.properties.ahtiId === selectedFeature.properties.ahtiId,
            color: getRouteColor(feature.properties.category.id),
          },
        };
      }),
  };
};

export const getMapStyle = (): {} => {
  return {
    ...mapStyle,
    sprite:
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '') +
      '/sprites/ahti-sprite',
  };
};

export const getMapStyleWithRoutes = (
  routes?: GeoJSON.FeatureCollection<GeoJSON.LineString>
): {} => {
  return {
    ...mapStyle,
    sprite:
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '') +
      '/sprites/ahti-sprite',
    sources: {
      ...mapStyle.sources,
      'route-data': { type: 'geojson', data: routes },
    },
    layers: [
      ...mapStyle.layers,
      {
        id: 'route-line',
        type: 'line',
        source: 'route-data',
        paint: {
          'line-width': 2.5,
          'line-color': ['get', 'color'],
        },
      },
      {
        id: 'route-line-selected',
        type: 'line',
        source: 'route-data',
        filter: ['==', 'selected', true],
        paint: {
          'line-width': 5.0,
          'line-color': ['get', 'color'],
        },
      },
      {
        id: 'route-text-label',
        type: 'symbol',
        source: 'route-data',
        layout: {
          'symbol-placement': 'line',
          'text-field': '{name}',
          'text-size': 10,
        },
        paint: {
          'text-color': '#444',
          'text-halo-blur': 0.5,
          'text-halo-color': '#ffffff',
          'text-halo-width': 1,
        },
      },
    ],
  };
};
