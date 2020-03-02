import React, { useState } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import mapStyle from '../../assets/mapStyle.json';
import classNames from 'classnames';

import styles from './Map.module.scss';

const MapGL = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoicmlpdHRhZ2lybCIsImEiOiJjamZkdzZ4MXYycnlkMnJudmxwb2x3Yzh0In0.5jCRD5YcqflEAuZqTUct9g'
});

const state = {
  viewport: {
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: [8]
  }
};

const Map = ({ className }: { className: string; translate: boolean }) => {
  const center = [24.944, 60.15];

  const [viewport, setViewport] = useState({
    width: 474,
    height: 520,
    latitude: 60.15,
    longitude: 24.944,
    zoom: 12,
    minZoom: 8,
    maxZoom: 18
  });
  return (
    <div className={classNames(styles.container, className)}>
      <MapGL
        style="mapbox://styles/mapbox/streets-v9"
        center={center}
        containerStyle={{
          height: '100vh',
          width: '472px'
        }}
      ></MapGL>
    </div>
  );
};

export default Map;
