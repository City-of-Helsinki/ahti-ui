import React, { useState } from 'react';
import MapGL from 'react-map-gl';
import { Header } from 'semantic-ui-react';
import queryString from 'query-string';
import 'mapbox-gl/dist/mapbox-gl.css';

export default ({ pointData }) => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 60.15,
    longitude: 24.944,
    zoom: 10,
    minzoom: 3,
    maxzoom: 9,
    bearing: 0,
    pitch: 0,
  });

  const [displayedPoints, setDisplayedPoints] = useState(() => {
    const query = queryString.parse(window.location.search);
    let filteredPoints = pointData;
    if (query.collection) {
      filteredPoints = filteredPoints.find(
        point => point.properties.type === query.collection
      );
    }

    return filteredPoints;
  });

  return (
    <React.Fragment>
      <Header as="h4">
        Displayed collection:{' '}
        {queryString.parse(window.location.search).collection}
      </Header>
      <MapGL
        {...viewport}
        onViewportChange={viewport => setViewport(viewport)}
        mapStyle="mapbox://styles/ohel/cjxodqmm92eao1cqnjz85qnww"
        mapboxApiAccessToken={process.env.REACT_APP_ACCESSTOKEN}
        className="map"
      />
    </React.Fragment>
  );
};
