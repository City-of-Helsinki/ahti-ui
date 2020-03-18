import React, { useState, useEffect } from 'react';
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
  selectedFeatureZoomLevel,
  maxZoomLevel,
  minZoomLevel,
  transitionDuration
} from '../../constants';
import CategoryIcon from '../CategoryIcon/CategoryIcon';
import styles from './Map.module.scss';

interface MapProps {
  readonly className?: string;
  readonly features: Feature[];
  readonly selectedFeature?: Feature | null;
  onClick(feature: Feature): void;
}

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

const Map: React.FC<MapProps> = ({
  className,
  features,
  selectedFeature,
  onClick
}) => {
  const { t } = useTranslation();
  const [viewPort, setViewPort] = useState<ViewportState>({
    width: '100%',
    height: '100%',
    longitude: selectedFeature
      ? selectedFeature.geometry.coordinates[0]
      : initialLongitude,
    latitude: selectedFeature
      ? selectedFeature.geometry.coordinates[1]
      : initialLatitude,
    zoom: selectedFeature ? selectedFeatureZoomLevel : initialZoomLevel,
    minZoom: minZoomLevel,
    maxZoom: maxZoomLevel
  });

  const renderPin = (feature: Feature, id: number) => {
    if (feature.geometry.type !== 'Point') {
      return null;
    }
    const isSelected =
      feature?.properties?.ahtiId === selectedFeature?.properties?.ahtiId;
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
        transitionDuration: transitionDuration
      });
    };

    return (
      <Marker
        key={id}
        longitude={feature.geometry.coordinates[0]}
        latitude={feature.geometry.coordinates[1]}
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
