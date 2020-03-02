import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import classNames from 'classnames';

import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.module.scss';

export interface Props {
  className: string;
}

const Map = ({ className }: Props) => {
  const center = [24.944, 60.15];
  const style = 'mapbox://styles/mapbox/streets-v9';

  const MapGL = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoicmlpdHRhZ2lybCIsImEiOiJjamZkdzZ4MXYycnlkMnJudmxwb2x3Yzh0In0.5jCRD5YcqflEAuZqTUct9g'
  });

  return (
    <div className={classNames(styles.container, className)}>
      <MapGL
        style={style}
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
