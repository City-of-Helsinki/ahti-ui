import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { GlobalGeoContext } from '../../App';
import queryString from 'query-string';
import MapboxMap from '../MapboxMap/MapboxMap';
import Carousel from '../Carousel/Carousel';

const MapPage = ({ location, history }) => {
  const pointData = useContext(GlobalGeoContext);

  const [displayedPoints, setDisplayedPoints] = useState([]);
  const [useLocation, setUseLocation] = useState(false);


  // TODO: only rerender map center in state
  // (maybe this will prevvent the components from re-renderinng)
  // https://www.robinwieruch.de/react-prevent-rerender-component/https://www.robinwieruch.de/react-prevent-rerender-component/
  // https://stackoverflow.com/questions/42068283/how-prevent-rerender-of-parent-component-in-react-js

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
    // shallow copy so global context is not mutated
    let filteredPoints = [...pointData];

    const browserQuery = queryString.parse(location.search);

    if (browserQuery.type || browserQuery.name || browserQuery.tag) {
      filteredPoints = filteredPoints.filter(
        point =>
          (point.properties.type &&
            point.properties.type === browserQuery.type) ||
          (point.properties.name &&
            point.properties.name === browserQuery.name) ||
          (point.properties.tag &&
            point.properties.tag.includes(browserQuery.tag))
      );
    }

    if (useLocation) {
      filteredPoints.sort(
        (a, b) => a.geometry.coordinates[0] - b.geometry.coordinates[0]
      );
    }

    setDisplayedPoints(filteredPoints);
  }, [location.search, pointData, useLocation]);

  return (
    <React.Fragment>
      <MapboxMap
        history={history}
        viewport={viewport}
        setViewport={setViewport}
        displayedPoints={displayedPoints}
      />
      {displayedPoints.length > 0 && (
        <Carousel setViewport={setViewport} displayedPoints={displayedPoints} />
      )}
    </React.Fragment>
  );
};

export default withRouter(MapPage);
