import React, { useEffect, useState, useContext, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { GlobalGeoContext } from '../../App';
import { GlobalLineContext } from '../../App';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import MapboxMap from '../MapboxMap/MapboxMap';
import Carousel from '../Carousel/Carousel';
import MapCard from '../MapCard/MapCard';
import MapWrapper from '../MapWrapper/MapWrapper';
import { FlyToInterpolator, LinearInterpolator } from 'react-map-gl';
import CarouselWrapper from '../CarouselWrapper/CarouselWrapper';
import UnstyledLink from '../UnstyledLink/UnstyledLink';

import styled from 'styled-components';

// MapPage rerenders often because viewport state, use memo to prevent unnecessary carousel renders
const MemoCarousel = React.memo(Carousel);

const ShowAllButton = styled(UnstyledLink)`
  z-index: 1;
  position: absolute;
  top: 7.5rem;
  right: 1rem;

  background-color: ${props => props.theme.colors.white};
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.15);
  border-radius: ${props => (props.language === 'fi' ? '18%' : '25%')} / 50%;
  color: ${props => props.theme.colors.black};
  padding: 1rem;
  padding-top: 1.1rem;
  font-size: 1.4rem;
  font-weight: 600;
`;

const MapPage = ({ location, history }) => {
  const pointData = useContext(GlobalGeoContext);
  const lineData = useContext(GlobalLineContext);
  const { t, i18n } = useTranslation();

  const [displayedPoints, setDisplayedPoints] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousPoint, setPreviousPoint] = useState(null);
  const [viewport, setViewport] = useState({
    // arbitrary max-width of 474px for wide screens
    width:
      Math.min(
        window.innerWidth || document.documentElement.clientWidth,
        474
      ) || 400,
    // Equivalent of 92vh. The styles assume these measures
    height: window.innerHeight || document.documentElement.clientHeight || 400,
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

  const browserQuery = queryString.parse(location.search);

  const flyToPoint = useCallback(
    (geometry, transitionDuration, cardView, zoomDifference) => {
      const longitude = geometry.coordinates[0];

      // make the map roughly centered even when a card is displayed
      const latitude = cardView
        ? geometry.coordinates[1] - 0.005
        : geometry.coordinates[1] - 0.0015;

      // always use zoom=14 in cardView, otherwise use zoomDifference if specified
      setViewport(oldViewport => ({
        ...oldViewport,
        longitude,
        latitude,
        zoom: cardView
          ? 14
          : zoomDifference
          ? oldViewport.zoom + zoomDifference
          : 12,
        transitionInterpolator: cardView
          ? new FlyToInterpolator()
          : // use LinearInterpolator outside cardView to prevent Clusters from glitching
            new LinearInterpolator(),
        transitionDuration,
      }));
    },
    []
  );

  useEffect(() => {
    // shallow copy so global context is not mutated
    let filteredPoints = [...pointData];

    // filter points according to search query
    if (browserQuery.type) {
      filteredPoints = filteredPoints.filter(
        point =>
          point.properties.type && point.properties.type === browserQuery.type
      );
    }
    filteredPoints.sort(
      (a, b) => a.geometry.coordinates[0] - b.geometry.coordinates[0]
    );

    setDisplayedPoints(filteredPoints);

    const index = filteredPoints.findIndex(
      point => point.properties.fi.name === previousPoint
    );
    setCurrentSlide(index);
  }, [browserQuery.type, pointData, previousPoint]);

  useEffect(() => {
    if (browserQuery.name) {
      setPreviousPoint(browserQuery.name);
      const index = displayedPoints.findIndex(
        point => point.properties.fi.name === browserQuery.name
      );
      if (displayedPoints[index]) {
        flyToPoint(displayedPoints[index].geometry, 700, true);
        setCurrentSlide(index);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserQuery.name]);

  return (
    <React.Fragment>
      <MapWrapper>
        {browserQuery && !(Object.entries(browserQuery).length === 0) && (
          <ShowAllButton to="/map" language={i18n.language}>
            {t('map.show_all_button')}
          </ShowAllButton>
        )}
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

      {displayedPoints.length > 0 && !browserQuery.name && !browserQuery.line && (
        <CarouselWrapper>
          <MemoCarousel
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            flyToPoint={flyToPoint}
            displayedPoints={displayedPoints}
            location={location}
          />
        </CarouselWrapper>
      )}
      {browserQuery.line && (
        <MapCard
          closeCardLink={
            browserQuery.type ? `/map?type=${browserQuery.type}` : '/map'
          }
          onBack={history.goBack}
          pointData={
            lineData.filter(
              line =>
                line.properties.fi.name.toLowerCase() ===
                browserQuery.line.toLowerCase()
            )[0]
          }
        />
      )}
      {!browserQuery.line && browserQuery.name && (
        <MapCard
          closeCardLink={
            browserQuery.type ? `/map?type=${browserQuery.type}` : '/map'
          }
          onBack={history.goBack}
          pointData={
            displayedPoints.filter(
              point =>
                point.properties.fi.name.toLowerCase() ===
                browserQuery.name.toLowerCase()
            )[0]
          }
        />
      )}
    </React.Fragment>
  );
};

export default withRouter(MapPage);
