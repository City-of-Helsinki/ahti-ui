import React from 'react';
import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default class MapboxMap extends React.Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 60.15,
      longitude: 24.944,
      zoom: 10,
      minzoom: 3,
      maxzoom: 9,
      bearing: 0,
      pitch: 0,
    },
  };

  render() {
    console.log('hello, map');
    return (
      <MapGL
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapStyle="mapbox://styles/ohel/cjxodqmm92eao1cqnjz85qnww"
        mapboxApiAccessToken={process.env.REACT_APP_ACCESSTOKEN}
        className="map"
      />
    );
  }
}
