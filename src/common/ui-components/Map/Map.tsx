import React, { useState } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { Feature } from '../../../domain/api/generated/types.d';
import mapStyle from '../../../assets/mapStyle.json';
import {
  initialLatitude,
  initialLongitude,
  initialZoomLevel
} from '../../constants';
import CategoryIcon from '../CategoryIcon/CategoryIcon';

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
  const [viewPort, setViewPort] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
    zoom: initialZoomLevel
  });

  const renderPin = (feature: Feature, id: number) => {
    return (
      <Marker
        key={id}
        longitude={feature.geometry.coordinates[0]}
        latitude={feature.geometry.coordinates[1]}
      >
        <div onClick={() => onClick(feature)}>
          <CategoryIcon category={feature?.properties?.category?.name} />
        </div>
      </Marker>
    );
  };

  return (
    <MapGL
      className={className}
      width={'100%'}
      height={'100vh'}
      {...viewPort}
      mapStyle={getMapStyle()}
      onViewportChange={setViewPort}
    >
      {features?.map((feature: Feature, id: number) => renderPin(feature, id))}
    </MapGL>
  );
};

export default Map;
