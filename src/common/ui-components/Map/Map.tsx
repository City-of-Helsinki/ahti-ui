import React, { useState, useRef } from 'react';
// eslint-disable-next-line import/order
import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  StaticMap,
  ViewportProps,
} from 'react-map-gl';
import { BBox } from 'geojson';
import useSupercluster from 'use-supercluster';
import { useTranslation } from 'react-i18next';
import { PointFeature } from 'supercluster';

import { Feature } from '../../../domain/api/generated/types.d';
import {
  initialLatitude,
  initialLongitude,
  initialZoomLevel,
  maxZoomLevel,
  minZoomLevel,
  clusteringRadius,
  selectedFeatureZoomLevel,
  transitionDuration,
} from '../../constants';
import CategoryIcon from '../CategoryIcon/CategoryIcon';
import mapStyle from '../../../assets/mapStyle.json';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.module.scss';
import { getMapStyle, getFlyToPoint, getPoints, getRoutes } from './mapUtils';

/*
// Approach for clustering used from here
// https://www.leighhalliday.com/mapbox-clustering
*/
// from here https://www.leighhalliday.com/mapbox-clustering
// @ts-ignore

interface MapProps {
  readonly className?: string;
  readonly features: Feature[];
  readonly selectedFeature?: Feature | null;
  onClick(feature: Feature): void;
}

type GeoJsonProperties = { cluster: boolean; itemId: string; category: string };
type ClusterProperties = GeoJsonProperties & { point_count: number };

const getMapStyle = (): {} => {
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

const Map: React.FC<MapProps> = ({ className, features, onClick }) => {
  const { t } = useTranslation();
  const [viewPort, setViewPort] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
    zoom: initialZoomLevel,
    minZoom: minZoomLevel,
    maxZoom: maxZoomLevel,
  });

  const mapRef = useRef<StaticMap>();

  const renderPin = (
    pointFeature: PointFeature<GeoJsonProperties>,
    id: number | string
  ) => {
    const feature = features.find((feature) => feature.id === pointFeature.id);
    return (
      <Marker
        key={id}
        longitude={feature.geometry.coordinates[0]}
        latitude={feature.geometry.coordinates[1]}
      >
        <div onClick={() => onClick(feature)} className={styles.markerContent}>
          <CategoryIcon category={feature?.properties?.category?.name} />
        </div>
      </Marker>
    );
  };

  const points = features
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

  // get map bounds
  const getBounds: () => BBox | null = function () {
    const current = mapRef?.current;
    if (!current) return null;

    return current.getMap().getBounds().toArray().flat() as BBox;
  };

  const bounds = getBounds();

  const { clusters } = useSupercluster<GeoJsonProperties, ClusterProperties>({
    points,
    bounds,
    zoom: viewPort.zoom,
    options: { radius: 75, maxZoom: viewPort.maxZoom },
  });

  return (
    <MapGL
      {...viewPort}
      mapStyle={getMapStyle()}
      onViewportChange={(viewState: ViewportProps) =>
        setViewPort({
          latitude: viewPort.latitude,
          longitude: viewPort.longitude,
          zoom: viewPort.zoom,
          minZoom: viewPort.minZoom,
          maxZoom: viewPort.maxZoom,
          clusteringRadius: viewPort.clusteringRadius,
        })
      }
      ref={mapRef}
    >
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster } = cluster.properties;

        // this is temporary, new designs should come soon
        if (isCluster) {
          const {
            point_count: pointCount,
          } = cluster.properties as ClusterProperties;
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              latitude={latitude}
              longitude={longitude}
            >
              <div
                className={styles.clusterMarker}
                style={{
                  width: `${10 + (pointCount / points.length) * 20}px`,
                  height: `${10 + (pointCount / points.length) * 20}px`,
                }}
              >
                {pointCount}
              </div>
            </Marker>
          );
        }
        return renderPin(
          cluster as PointFeature<GeoJsonProperties>,
          cluster.id
        );
      })}
      <div className={styles.mapControls}>
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          onViewportChange={() => {
            /* NOOP, disables flying to location */
          }}
          label={t('map.geolocate')}
        />
        <div className={styles.mapControlsDivider}></div>
        <NavigationControl
          zoomInLabel={t('map.zoom_in')}
          zoomOutLabel={t('map.zoom_out')}
          showCompass={false}
        />
      </div>
    </MapGL>
  );
};
export default Map;
