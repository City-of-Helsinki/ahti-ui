import React, { useState, useRef } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useTranslation } from 'react-i18next';

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
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.module.scss';
import { getMapStyle, getFlyToPoint, getPoints, getRoutes } from './mapUtils';

/*
// Approach for clustering used from here
// https://www.leighhalliday.com/mapbox-clustering
*/
interface MapProps {
  readonly className?: string;
  readonly features: Feature[];
  readonly selectedFeature?: Feature | null;
  onClick(feature: Feature): void;
}
type GeoJsonProperties = { cluster: boolean; itemId: string; category: string };
type ClusterProperties = GeoJsonProperties & { point_count: number };

type ViewportState = {
  width?: string | number;
  height?: string | number;
  latitude: number;
  longitude: number;
  zoom: number;
  minZoom: number;
  maxZoom: number;
  transitionInterpolator?: TransitionInterpolator;
  transitionDuration?: number | 'auto';
  transitionInterruption?: TRANSITION_EVENTS;
  transitionEasing?: EasingFunction;
  bearing?: number;
  pitch?: number;
  altitude?: number;
  maxPitch?: number;
  minPitch?: number;
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
  const mapRef = useRef();

  const mapRef = useRef<StaticMap>();
  const renderPin = (
    pointFeature: PointFeature<GeoJsonProperties>,
    id: number | string
  ) => {
    if (pointFeature.geometry.type !== 'Point') {
      return null;
    }

    const isSelected =
      pointFeature?.properties?.itemId === selectedFeature?.properties?.ahtiId;
    const onMarkerClick = () => {
      onClick(feature);
      window && window.scrollTo({ top: 0 });
      setViewPort({
        ...viewPort,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        zoom:
          viewPort.zoom > selectedFeatureZoomLevel
            ? viewPort.zoom
            : selectedFeatureZoomLevel,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: transitionDuration,
      });
    };
    const feature = features.find((feature) => feature.id === pointFeature.id);
    return (
      <Marker
        key={`pin-${id}`}
        longitude={pointFeature.geometry.coordinates[0]}
        latitude={pointFeature.geometry.coordinates[1]}
      >
        <div onClick={onMarkerClick} className={styles.markerContent}>
          <CategoryIcon
            category={feature?.properties?.category?.id}
            className={isSelected ? styles.bigIcon : undefined}
          />
        </div>
      </Marker>
    );
  };

  const points = features.map(feature => {
    return {
      type: 'Feature',
      properties: {
        cluster: false,
        itemId: feature.id,
        category: feature.properties?.category
      },
      geometry: {
        type: 'Point',
        coordinates: [
          feature.geometry.coordinates.lng,
          feature.geometry.coordinates.lat
        ]
      }
    };
  });

  const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

  // get clusters
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  return (
    <MapGL
      {...viewPort}
      mapStyle={getMapStyle(routes)}
      width={'100%'}
      height={'100%'}
      className={className}
      ref={mapRef}
      onViewportChange={setViewPort}
      ref={mapRef}
    >
      {/* {features.map((feature: Feature, id: number) => renderPin(feature, id))} */}
      {clusters.map(cluster => {
        // every cluster point has coordinates
        const [longitude, latitude] = cluster.geometry.coordinates;
        // the point may be either a cluster or a crime point
        const {
          cluster: isCluster,
          point_count: pointCount
        } = cluster.properties;

        // we have a cluster to render
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              latitude={latitude}
              longitude={longitude}
            >
              <div
                className="cluster-marker"
                style={{
                  width: `${10 + (pointCount / points.length) * 20}px`,
                  height: `${10 + (pointCount / points.length) * 20}px`
                }}
              >
                {pointCount}
              </div>
            </Marker>
          );
        }

        // we have a single point (crime) to render
        return (
          <Marker
            key={`crime-${cluster.properties.crimeId}`}
            latitude={latitude}
            longitude={longitude}
          >
            <button className="crime-marker">
              <img src="/custody.svg" alt="crime doesn't pay" />
            </button>
          </Marker>
        );
      })}
    </MapGL>
  );
};
export default Map;
