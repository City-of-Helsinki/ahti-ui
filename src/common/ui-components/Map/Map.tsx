import React, { useState, useRef } from 'react';
// eslint-disable-next-line import/order
import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl
} from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import { useTranslation } from 'react-i18next';

import { Feature } from '../../../domain/api/generated/types.d';
import {
  initialLatitude,
  initialLongitude,
  initialZoomLevel,
  maxZoomLevel,
  minZoomLevel
} from '../../constants';
import CategoryIcon from '../CategoryIcon/CategoryIcon';
import mapStyle from '../../../assets/mapStyle.json';

import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.module.scss';

/*
// Approach for clustering used from here
// https://www.leighhalliday.com/mapbox-clustering
*/

interface MapProps {
  readonly className?: string;
  readonly features: Feature[];
  onClick(feature: Feature): void;
}

const getMapStyle = (): {} => {
  return {
    ...mapStyle,
    sprite:
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '') +
      '/sprites/ahti-sprite'
  };
};

const Map: React.FC<MapProps> = ({ className, features, onClick }) => {
  const { t } = useTranslation();
  const [viewPort, setViewPort] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
    zoom: initialZoomLevel,
    minZoom: minZoomLevel,
    maxZoom: maxZoomLevel
  });
  const mapRef = useRef();

  const mapRef = useRef();

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
        itemId: feature.properties.imageId,
        category: feature.properties.type
      },
      geometry: {
        type: 'Point',
        coordinates: [
          feature.geometry.coordinates[0],
          feature.geometry.coordinates[1]
        ]
      }
    };
  });

  // get map bounds
  const bounds: number[] = mapRef?.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom: viewPort.zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  return (
    <MapGL
      className={className}
      width={'100%'}
      height={'100vh'}
      {...viewPort}
      mapStyle={getMapStyle()}
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
      {clusters.map(cluster => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const {
          cluster: isCluster,
          point_count: pointCount
        } = cluster.properties;

        // this is temporary, new designs should come soon
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

        return renderPin(cluster, cluster.id);
      })}
    </MapGL>
  );
};

export default Map;
