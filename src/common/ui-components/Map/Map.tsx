<<<<<<< HEAD
import React, { useState } from 'react';
// eslint-disable-next-line import/order
import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl
} from 'react-map-gl';
=======
import React, { useState, useRef } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
>>>>>>> Add Map clustering- first iteratuon
import 'mapbox-gl/dist/mapbox-gl.css';

import { useTranslation } from 'react-i18next';

import { Feature } from '../../../domain/api/generated/types.d';
import mapStyle from '../../../assets/mapStyle.json';
import {
  initialLatitude,
  initialLongitude,
  initialZoomLevel,
  maxZoomLevel,
  minZoomLevel
} from '../../constants';
import CategoryIcon from '../CategoryIcon/CategoryIcon';
import styles from './Map.module.scss';

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
      className={className}
      width={'100%'}
      height={'100vh'}
      {...viewPort}
      mapStyle={getMapStyle()}
      onViewportChange={setViewPort}
      ref={mapRef}
    >
<<<<<<< HEAD
      {features.map((feature: Feature, id: number) => renderPin(feature, id))}
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
=======
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
>>>>>>> Add Map clustering- first iteratuon
    </MapGL>
  );
};

export default Map;
