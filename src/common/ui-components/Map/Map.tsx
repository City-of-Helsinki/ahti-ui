import React, { useState, useRef } from 'react';
// eslint-disable-next-line import/order
import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
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

<<<<<<< HEAD
/*
// Approach for clustering used from here
// https://www.leighhalliday.com/mapbox-clustering
*/
=======
// from here https://www.leighhalliday.com/mapbox-clustering
// @ts-ignore

>>>>>>> Redraw viewport on useeffect
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

  const renderPin = (feature: Feature, id: number) => {
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
  const points = features.map(feature => {
    return {
      type: 'Feature',
      properties: {
        cluster: false,
        itemId: feature.id,
        category: feature.properties?.category,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          feature.geometry.coordinates.lng,
          feature.geometry.coordinates.lat,
        ],
      },
    };
  });

  const mapRef = useRef(null);
  let bounds = [];
  let clusters = [];

  function createClusters() {
    bounds = mapRef.current
      .getMap()
      .getBounds()
      .toArray()
      .flat();

    clusters = useSupercluster({
      points,
      bounds,
      zoom: viewPort.zoom,
      options: { radius: 75, maxZoom: 20 }
    }).clusters;

    setViewPort();
  }
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    createClusters();
  }, [createClusters]);

  // create clusters

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
      <div className={styles.mapControls}>
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          onViewportChange={() => {
            /* NOOP, disables flying to location */
          }}
          label={t('map.geolocate')}
        />
        <div className={styles.mapControlsDivider} />
        <NavigationControl
          zoomInLabel={t('map.zoom_in')}
          zoomOutLabel={t('map.zoom_out')}
          showCompass={false}
        />
      </div>
      {clusters.map((cluster) => {
        // every cluster point has coordinates
        const [longitude, latitude] = cluster.geometry.coordinates;
        // the point may be either a cluster or a crime point
        const {
          cluster: isCluster,
          point_count: pointCount,
        } = cluster.properties;

        // we have a cluster to render
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              latitude={latitude}
              longitude={longitude}
            >
              X
            </Marker>
          );
        } else {
          return null;
        }
        //   return features.map((feature: Feature, id: number) => renderPin(feature, id));
        // }
      })}
    </MapGL>
  );
};
export default Map;
