import { FormikHandlers } from 'formik';
import React, { useState } from 'react';
import MapGL, { Marker, PointerEvent } from 'react-map-gl';

import {
  initialLatitude,
  initialLongitude,
  initialZoomLevel,
} from '../../constants';
import styles from '../SuggestionForm.module.scss';
import { getMapStyle } from '../../../common/ui-components/Map/mapUtils';
import PinIcon from '../../../common/ui-components/Map/PinIcon/PinIcon';
import { Coordinates } from '../types';

interface CoordinateSelectProps {
  readonly labelText: string;
  readonly id: string;
  readonly value: Coordinates;
  readonly handleChange: FormikHandlers['handleChange'];
}

const CoordinateSelect: React.FC<CoordinateSelectProps> = ({
  labelText,
  id,
  value,
  handleChange,
}) => {
  const onMapClick = (event: PointerEvent) => {
    handleChange({
      target: {
        id,
        value: {
          latitude: event.lngLat[1],
          longitude: event.lngLat[0],
        },
      },
    });
  };
  const [viewPort, setViewPort] = useState({
    longitude: initialLongitude,
    latitude: initialLatitude,
    zoom: initialZoomLevel,
  });
  return (
    <div>
      <label className={styles.labelText}>{labelText}</label>
      <div className={styles.mapContainer}>
        <MapGL
          {...viewPort}
          onViewportChange={setViewPort}
          mapStyle={getMapStyle()}
          width={'100%'}
          height={'100%'}
          onNativeClick={onMapClick}
          getCursor={() => 'crosshair'}
          attributionControl={null}
        >
          <Marker longitude={value.longitude} latitude={value.latitude}>
            <PinIcon />
          </Marker>
        </MapGL>
      </div>
    </div>
  );
};

export default CoordinateSelect;
