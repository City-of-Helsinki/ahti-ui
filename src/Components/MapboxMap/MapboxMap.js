import React, { useMemo, useState, useEffect, useRef } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import PointPin from '../MapPins/PointPin';
import ClusterPin from '../MapPins/ClusterPin';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import Cluster from '../Cluster/Cluster';
import { getPointQuery, getLineQuery, getIslandQuery } from '../../utils';

// using ReactMapGL might not be the most optimal for us, there is a plan to put it on a new componnets in the futyre
const MapboxMap = ({
  viewport,
  setViewport,
  displayedPoints,
  history,
  location,
  flyToPoint,
  currentSlide,
}) => {
  const { t, i18n } = useTranslation();
  const map = useRef(null);
  const parsedSearch = useMemo(() => queryString.parse(location.search), [
    location.search,
  ]);
  const [mapStyle, setMapStyle] = useState(getMapStyleUrl('fi'));

  useEffect(() => {
    setMapStyle(getMapStyleUrl(i18n.language));
  }, [i18n.language]);

  // Update line width for active line, or reset it to 3, if not.
  // NOTE: There seems to be a timing bug, when you zoom in quickly
  // and then tap on a route. When that happens, the line style might
  // not change. We suspect this is because of the map style or tiles
  // loading, but have not figured out what.
  const paintLineStyles = parsedSearch => {
    if (map.current && map.current.getMap().isStyleLoaded()) {
      map.current
        .getMap()
        .setPaintProperty('routes', 'line-width', [
          'match',
          ['get', 'name'],
          parsedSearch.line || 'none',
          3,
          1.5,
        ]);
    }
  };

  // Update line styles whenever the search changes
  useEffect(() => {
    paintLineStyles(parsedSearch);
  }, [parsedSearch]);

  const _onClick = event => {
    const { features } = event;
    const clickedPlace =
      features &&
      features.find(f => ['routes', 'islands'].includes(f.layer.id));

    clickedPlace &&
      clickedPlace.properties.name &&
      (clickedPlace.layer.id === 'routes'
        ? history.push(`/map?${getLineQuery(clickedPlace, parsedSearch)}`)
        : history.push(`/map?${getIslandQuery(clickedPlace, parsedSearch)}`));
  };

  const _renderMarker = () => {
    return (
      displayedPoints &&
      displayedPoints.map((point, index) => {
        const isActive =
          parsedSearch.name === point.properties.fi.name ||
          index === currentSlide;

        const query = getPointQuery(point, parsedSearch);
        return (
          <Marker
            key={`marker-${index}`}
            longitude={point.geometry.coordinates[0]}
            latitude={point.geometry.coordinates[1]}
          >
            <PointPin
              isActive={isActive}
              type={point.properties.type}
              onClick={() => {
                history.push(`/map?${query}`);
              }}
            />
          </Marker>
        );
      })
    );
  };

  return (
    <React.Fragment>
      <MapGL
        {...viewport}
        ref={map}
        mapStyle={mapStyle}
        mapboxApiAccessToken={process.env.REACT_APP_ACCESSTOKEN}
        onViewportChange={viewport => setViewport(viewport)}
        onNativeClick={_onClick}
        clickRadius={10}
        onLoad={() => paintLineStyles(parsedSearch)}
      >
        {map.current && (
          <Cluster
            map={map.current.getMap()}
            radius={30}
            extent={512}
            nodeSize={40}
            minZoom={0}
            maxZoom={10}
            currentSlide={currentSlide}
            element={e => {
              return <ClusterPin {...e} flyToPoint={flyToPoint} />;
            }}
          >
            {_renderMarker()}
          </Cluster>
        )}
      </MapGL>
    </React.Fragment>
  );
};

// Utils
function getMapStyleUrl(language) {
  if (language && language !== 'fi') {
    return 'mapbox://styles/strawshield/cjy8e6acb03ff1cobkxdh1cjv';
  } else {
    return 'mapbox://styles/strawshield/cjy8e6acb03ff1cobkxdh1cjv';
  }
}

export default MapboxMap;
