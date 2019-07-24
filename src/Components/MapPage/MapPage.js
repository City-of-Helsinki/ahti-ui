import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { GlobalGeoContext } from '../../App';
import queryString from 'query-string';
import MapboxMap from '../MapboxMap/MapboxMap';
import Carousel from '../Carousel/Carousel';
import MapCard from '../MapCard/MapCard';
import TagCard from '../TagCard/TagCard';
import MapWrapper from '../MapWrapper/MapWrapper';
import { FlyToInterpolator, LinearInterpolator } from 'react-map-gl';
import CarouselWrapper from '../CarouselWrapper/CarouselWrapper';
import UnstyledLink from '../UnstyledLink/UnstyledLink';

import styled from 'styled-components';
import { ReactComponent as ShowAll } from '../../assets/icons/show_all.svg';

const ShowAllButton = styled(UnstyledLink)`
  z-index: 1;
  position: absolute;
  top: 2.7rem;
  right: 2rem;
`;

const MapPage = ({ location, history }) => {
  const pointData = useContext(GlobalGeoContext);

  const [displayedPoints, setDisplayedPoints] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [useLocation, setUseLocation] = useState(false);
  const [viewport, setViewport] = useState({
    // arbitrary max-width of 474px for wide screens
    width:
      Math.min(
        window.innerWidth || document.documentElement.clientWidth,
        474
      ) || 400,
    // Equivalent of 92vh. The styles assume these measures
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
        flyToPoint(displayedPoints[index].geometry, 700, true);
        setCurrentSlide(index);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, pointData, useLocation]);

  const flyToPoint = (
    geometry,
    transitionDuration,
    cardView,
    zoomDifference
  ) => {
    const longitude = geometry.coordinates[0];

    // make the map roughly centered even when a card is displayed
    const latitude = cardView
      ? geometry.coordinates[1] - 0.005
      : geometry.coordinates[1] - 0.0015;

    // always use zoom=14 in cardView, otherwise use zoomDifference if specified
    const zoom = cardView
      ? 14
      : zoomDifference
      ? viewport.zoom + zoomDifference
      : 15;
    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionInterpolator: cardView
        ? new FlyToInterpolator()
        : // use LinearInterpolator outside cardView to prevent Clusters from glitching
          new LinearInterpolator(),
      transitionDuration,
    });
  };

  return (
    <React.Fragment>
      <MapWrapper>
        <ShowAllButton to="/map">
          <ShowAll />
        </ShowAllButton>
        <MapboxMap
          location={location}
          history={history}
          viewport={viewport}
          flyToPoint={flyToPoint}
          setViewport={setViewport}
          displayedPoints={displayedPoints}
          currentSlide={currentSlide}
        />
      </MapWrapper>

      {displayedPoints.length > 0 &&
        !queryString.parse(location.search).name &&
        !queryString.parse(location.search).tag && (
          <CarouselWrapper>
            <Carousel
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
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
