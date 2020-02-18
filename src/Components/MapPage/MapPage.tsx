import React, { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';
import MapboxMap from '../MapboxMap/MapboxMap';
import MapWrapper from '../MapWrapper/MapWrapper';
import { FlyToInterpolator, LinearInterpolator } from 'react-map-gl';
import FEATURES_QUERY from './queries/featuresQuery';
import {
  FEATURES,
  FEATURES_features_edges_node,
} from '../../domain/api/generatedTypes/FEATURES';
import ResponsivePOIList from './POIList/ResponsivePOIList';
import Card from '../../domain/card/Card';
import { useOvermind } from '../../domain/overmind';

const MapPage = ({ location, history }: { location: any; history: any }) => {
  const { state, actions } = useOvermind();
  const { data } = useQuery<FEATURES>(FEATURES_QUERY);

  const [displayedPoints, setDisplayedPoints] = useState<
    FEATURES_features_edges_node[]
  >([]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousPoint, setPreviousPoint] = useState<string | string[] | null>(
    null
  );

  const [viewport, setViewport] = useState({
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
        // @ts-ignore
        actions.displayIslandCard(displayedPoints[index].properties.ahtiId);
      }
    } else {
      actions.clearCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserQuery.name, browserQuery.island, data, displayedPoints]);

  return (
    <React.Fragment>
      <MapWrapper>
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
        <ResponsivePOIList
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          flyToPoint={flyToPoint}
          displayedPoints={displayedPoints}
          location={location}
        />
      )}
      {state.cardData && (
        <Card onBack={history.goBack} feature={state.cardData} />
      )}
    </React.Fragment>
  );
};

export default withRouter(MapPage);
