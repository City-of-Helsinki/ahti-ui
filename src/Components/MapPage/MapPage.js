import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { GlobalGeoContext } from '../../App';
import queryString from 'query-string';
import MapboxMap from '../MapboxMap/MapboxMap';
import Carousel from '../Carousel/Carousel';
import MapCard from '../MapCard/MapCard';
import { FlyToInterpolator } from 'react-map-gl';

const MapPage = ({ location, history }) => {
  const pointData = useContext(GlobalGeoContext);

  const [displayedPoints, setDisplayedPoints] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(false);
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

    if (browserQuery.type || browserQuery.tag) {
      filteredPoints = filteredPoints.filter(
        point =>
          (point.properties.type &&
            point.properties.type === browserQuery.type) ||
          (point.properties.tag &&
            point.properties.tag.includes(browserQuery.tag))
      );
    }

    if (!useLocation) {
      filteredPoints.sort(
        (a, b) => a.geometry.coordinates[0] - b.geometry.coordinates[0]
      );
    } else {
      // Add location based sorting later
    }

    setDisplayedPoints(filteredPoints);

    if (browserQuery.name) {
      const index = displayedPoints.findIndex(
        point => point.properties.name === browserQuery.name
      );
      if (displayedPoints[index]) {
        flyToPoint(index, 700);
        setPreviousSlide(index);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, pointData, useLocation]);

  const flyToPoint = (index, transitionDuration) => {
    const longitude = displayedPoints[index].geometry.coordinates[0];
    const latitude = displayedPoints[index].geometry.coordinates[1];
    if (
      Math.abs(viewport.latitude - latitude) > 0.000001 &&
      Math.abs(viewport.longitude - longitude) > 0.000001
    ) {
      setViewport({
        longitude,
        latitude,
        zoom: 12,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration,
      });
    }
  };

  return (
    <React.Fragment>
      {displayedPoints.length > 0 && (
        <MapboxMap
          location={location}
          history={history}
          viewport={viewport}
          setViewport={setViewport}
          displayedPoints={displayedPoints}
        />
      )}

      {displayedPoints.length > 0 &&
        !queryString.parse(location.search).name && (
          <Carousel
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            previousSlide={previousSlide}
            setPreviousSlide={setPreviousSlide}
            viewport={viewport}
            setViewport={setViewport}
            flyToPoint={flyToPoint}
            displayedPoints={displayedPoints}
            location={location}
            history={history}
          />
        )}
      {queryString.parse(location.search).name && (
        <React.Fragment>
          <button onClick={history.goBack}>Back</button>
          <MapCard
            pointData={
              displayedPoints.filter(
                point =>
                  point.properties.name ===
                  queryString.parse(location.search).name
              )[0]
            }
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(MapPage);
