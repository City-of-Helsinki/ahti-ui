import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';
import { useTranslation } from 'react-i18next';
import MapboxMap from '../MapboxMap/MapboxMap';
import Carousel from '../Carousel/Carousel';
import MapCard from '../MapCard/MapCard';
import MapWrapper from '../MapWrapper/MapWrapper';
import { FlyToInterpolator, LinearInterpolator } from 'react-map-gl';
import CarouselWrapper from '../CarouselWrapper/CarouselWrapper';
import UnstyledLink from '../UnstyledLink/UnstyledLink';

import FEATURES_QUERY from './queries/featuresQuery';

import styled from 'styled-components';
import {
  FEATURES,
  FEATURES_features_edges_node,
} from '../../domain/api/generatedTypes/FEATURES';

// MapPage rerenders often because viewport state, use memo to prevent unnecessary carousel renders
const MemoCarousel = React.memo(Carousel);

interface ShowAllButtonProps {
  readonly language: string;
}

const ShowAllButton = styled(UnstyledLink)<ShowAllButtonProps>`
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

const MapPage = ({ location, history }: { location: any; history: any }) => {
  const { data } = useQuery<FEATURES>(FEATURES_QUERY);
  const { t, i18n } = useTranslation();

  const [displayedPoints, setDisplayedPoints] = useState<
    FEATURES_features_edges_node[]
  >([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousPoint, setPreviousPoint] = useState<string | string[] | null>(
    null
  );
  const [viewport, setViewport] = useState({
    // arbitrary max-width of 474px for wide screens
    width:
      Math.min(
        window.innerWidth || document.documentElement.clientWidth,
        474
      ) || 400,
    // Equivalent of 92vh. The styles assume these measures
    height:
      '100vh' ||
      window.innerHeight ||
      document.documentElement.clientHeight ||
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

  const browserQuery: ParsedQuery = queryString.parse(location.search);

  const flyToPoint = useCallback<{ (...args: any[]): any }>(
    (geometry, transitionDuration, cardView, zoomDifference) => {
      const longitude = geometry.coordinates[0];

      // make the map roughly centered even when a card is displayed
      const latitude = cardView
        ? geometry.coordinates[1] - 0.008
        : geometry.coordinates[1] - 0.0015;

      // always use zoom=14 in cardView, otherwise use zoomDifference if specified
      setViewport(oldViewport => ({
        ...oldViewport,
        longitude,
        latitude,
        zoom: cardView
          ? 13
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

  const mapFeatures = (
    data: FEATURES | null
  ): FEATURES_features_edges_node[] => {
    if (data && data.features && data.features.edges) {
      return data.features.edges.reduce<FEATURES_features_edges_node[]>(
        (acc, edge) => {
          if (edge && edge.node) {
            return [...acc, edge.node];
          }
          return acc;
        },
        []
      );
    }
    return [];
  };

  useEffect(() => {
    const mappedData = data ? mapFeatures(data) : [];

    // shallow copy so global context is not mutated
    let filteredPoints = [...mappedData];

    // filter points according to search query
    if (browserQuery.type) {
      filteredPoints = filteredPoints.filter(
        point =>
          point &&
          point.properties &&
          point.properties.type &&
          point.properties.type === browserQuery.type
      );
    }

    setDisplayedPoints(filteredPoints);

    const index = filteredPoints.findIndex(
      point =>
        point && point.properties && point.properties.name === previousPoint
    );
    setCurrentSlide(index);
  }, [browserQuery.type, previousPoint, data]);

  useEffect(() => {
    if (browserQuery.name) {
      setPreviousPoint(browserQuery.name);
      const index = displayedPoints.findIndex(point => {
        if (point && point.properties) {
          return point.properties.name === browserQuery.name;
        }
        return false;
      });
      if (displayedPoints[index]) {
        flyToPoint(displayedPoints[index].geometry, 700, true);
        setCurrentSlide(index);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserQuery.name, browserQuery.island, data]);

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

      {displayedPoints.length > 0 && !browserQuery.name && (
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
      {browserQuery.name && (
        <MapCard
          closeCardLink={
            browserQuery.type ? `/map?type=${browserQuery.type}` : '/map'
          }
          onBack={history.goBack}
          pointData={
            displayedPoints.filter(point => {
              if (point && point.properties) {
                return point.properties.name === browserQuery.name;
              }
              return false;
            })[0]
          }
        />
      )}
    </React.Fragment>
  );
};

export default withRouter(MapPage);
