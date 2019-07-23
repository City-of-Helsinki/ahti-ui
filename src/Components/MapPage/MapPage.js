import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { GlobalGeoContext } from '../../App';
import queryString from 'query-string';
import MapboxMap from '../MapboxMap/MapboxMap';
import Carousel from '../Carousel/Carousel';
import MapCard from '../MapCard/MapCard';
import TagCard from '../TagCard/TagCard';
import MapWrapper from '../MapWrapper/MapWrapper';
import { FlyToInterpolator } from 'react-map-gl';
import CarouselWrapper from '../CarouselWrapper/CarouselWrapper';

const MapPage = ({ location, history }) => {
  const pointData = useContext(GlobalGeoContext);

  const [displayedPoints, setDisplayedPoints] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(false);
  const [useLocation, setUseLocation] = useState(false);
  const [viewport, setViewport] = useState({
    width:
      Math.min(
        window.innerWidth || document.documentElement.clientWidth,
        474
      ) || 400,
    height:
      window.innerHeight * 0.92 ||
      document.documentElement.clientHeight * 0.92 ||
      400,
    latitude: 60.15,
    longitude: 24.944,
    zoom: 10,
    minZoom: 8,
    maxZoom: 18,
    bearing: 0,
    pitch: 0,
  });

  // TODO: only rerender map center in state
  // (maybe this will prevvent the components from re-renderinng)
  // https://www.robinwieruch.de/react-prevent-rerender-component/https://www.robinwieruch.de/react-prevent-rerender-component/
  // https://stackoverflow.com/questions/42068283/how-prevent-rerender-of-parent-component-in-react-js

  // TODO: get rid of react memeo as soon as we optimize the map page component
  // get screen dimensions to make map 100% width

  useEffect(() => {
    // shallow copy so global context is not mutated
    let filteredPoints = [...pointData];
    const browserQuery = queryString.parse(location.search);

    // filter points according to search query
    if (browserQuery.type || browserQuery.tag) {
      filteredPoints = filteredPoints.filter(
        point =>
          (point.properties.type &&
            point.properties.type === browserQuery.type) ||
          (point.properties.tag &&
            point.properties.tag.includes(browserQuery.tag))
      );
    }

    // sort filtered points
    if (!useLocation) {
      filteredPoints.sort(
        (a, b) => a.geometry.coordinates[0] - b.geometry.coordinates[0]
      );
    } else {
      // Add location based sorting later
    }

    setDisplayedPoints(filteredPoints);

    // fly to point on location.search update, prioritize name over tag
    const destination = browserQuery.name || browserQuery.tag;
    if (destination) {
      const index = displayedPoints.findIndex(
        point => point.properties.fi.name === destination
      );
      if (displayedPoints[index]) {
        flyToPoint(index, 700, true);
        setPreviousSlide(index);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, pointData, useLocation]);

  const flyToPoint = (index, transitionDuration, cardView) => {
    const longitude = displayedPoints[index].geometry.coordinates[0];

    // make the map roughly centered even when a card is displayed
    const latitude = cardView
      ? displayedPoints[index].geometry.coordinates[1] - 0.005
      : displayedPoints[index].geometry.coordinates[1] - 0.0015;
    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom: 14,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration,
    });
  };

  return (
    <React.Fragment>
      {displayedPoints.length > 0 && (
        <MapWrapper>
          <MapboxMap
            location={location}
            history={history}
            viewport={viewport}
            setViewport={setViewport}
            displayedPoints={displayedPoints}
          />
        </MapWrapper>
      )}

      {displayedPoints.length > 0 &&
        !queryString.parse(location.search).name &&
        !queryString.parse(location.search).tag && (
          <CarouselWrapper>
            <Carousel
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              previousSlide={previousSlide}
              setPreviousSlide={setPreviousSlide}
              viewport={viewport}
              flyToPoint={flyToPoint}
              displayedPoints={displayedPoints}
              location={location}
              history={history}
            />
          </CarouselWrapper>
        )}
      {queryString.parse(location.search).name && (
        <MapCard
          onBack={history.goBack}
          pointData={
            displayedPoints.filter(
              point =>
                point.properties.fi.name ===
                queryString.parse(location.search).name
            )[0]
          }
        />
      )}
      {!queryString.parse(location.search).name &&
        queryString.parse(location.search).tag && (
          <TagCard
            location={location}
            pointData={displayedPoints.filter(
              point =>
                point.properties.fi.name !==
                queryString.parse(location.search).tag
            )}
            tagData={displayedPoints.filter(
              point =>
                point.properties.fi.name ===
                queryString.parse(location.search).tag
            )}
          />
        )}
    </React.Fragment>
  );
};

export default withRouter(MapPage);
