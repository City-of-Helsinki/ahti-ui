import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import { GlobalGeoContext } from '../../App';
import queryString from 'query-string';
import MapboxMap from '../MapboxMap/MapboxMap';
import Carousel from '../Carousel/Carousel';

const MapPage = ({ location, history }) => {
  const pointData = useContext(GlobalGeoContext);

  const [displayedPoints, setDisplayedPoints] = useState([]);
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

  useEffect(() => {
    const query = queryString.parse(location.search);

    let filteredPoints = pointData;
    if (query.collection) {
      filteredPoints = filteredPoints.filter(
        point => point.properties.type === query.collection
      );
    }
    if (query.name) {
      filteredPoints = filteredPoints.filter(
        point => point.properties.name === query.name
      );
    }

    setDisplayedPoints(filteredPoints);
  }, [location.search, pointData]);

  return (
    <React.Fragment>
      <Header as="h4">
        Displayed collection: {queryString.parse(location.search).collection}
      </Header>
      <MapboxMap
        history={history}
        viewport={viewport}
        setViewport={setViewport}
        displayedPoints={displayedPoints}
      />
      <Carousel
        viewport={viewport}
        setViewport={setViewport}
        displayedPoints={displayedPoints}
      />
    </React.Fragment>
  );
};

export default withRouter(MapPage);
