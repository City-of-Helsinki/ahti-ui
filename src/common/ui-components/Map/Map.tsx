import React, { useState } from 'react';
// eslint-disable-next-line import/order
import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  ViewportProps,
  FlyToInterpolator,
  TransitionInterpolator
} from 'react-map-gl';
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

type ViewportState = {
  width: string;
  height: string;
  latitude: number;
  longitude: number;
  zoom: number;
  minZoom: number;
  maxZoom: number;
  transitionInterpolator?: TransitionInterpolator;
  transitionDuration?: number;
};

const Map: React.FC<MapProps> = ({ className, features, onClick }) => {
  const { t } = useTranslation();
  const [viewPort, setViewPort] = useState<ViewportState>({
    width: '100%',
    height: '100%',
    latitude: initialLatitude,
    longitude: initialLongitude,
    zoom: initialZoomLevel,
    minZoom: minZoomLevel,
    maxZoom: maxZoomLevel
  });

  const renderPin = (feature: Feature, id: number) => {
    return (
      <Marker
        key={id}
        longitude={feature.geometry.coordinates[0]}
        latitude={feature.geometry.coordinates[1]}
      >
        <div
          onClick={() => {
            onClick(feature);
            setViewPort({
              ...viewPort,
              longitude: feature.geometry.coordinates[0],
              latitude: feature.geometry.coordinates[1],
              zoom: 13,
              transitionInterpolator: new FlyToInterpolator(),
              transitionDuration: 700
            });
          }}
          className={styles.markerContent}
        >
          <CategoryIcon category={feature?.properties?.category?.id} />
        </div>
      </Marker>
    );
  };

  const onViewportChange = (viewPort: ViewportProps) => {
    const {
      width,
      height,
      transitionInterpolator,
      transitionDuration,
      ...rest
    } = viewPort;
    setViewPort({
      width: '100%',
      height: '100%',
      transitionInterpolator: undefined,
      transitionDuration: undefined,
      ...rest
    });
  };

  return (
    <MapGL
      className={className}
      {...viewPort}
      mapStyle={getMapStyle()}
      onViewportChange={onViewportChange}
    >
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
    </MapGL>
  );
};

export default Map;
