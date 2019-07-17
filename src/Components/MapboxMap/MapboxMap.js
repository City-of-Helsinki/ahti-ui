import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
import CityPin from '../Utils/city-pin';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';

// using ReactMapGL might not be the most optimal for us, there is a plan to put it on a new componnets in the futyre

export default ({
  viewport,
  setViewport,
  displayedPoints,
  history,
  location,
}) => {
  const { t, i18n } = useTranslation();
  const map = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/strawshield/cjxx7z1sf04rm1dl7bjryf4xf'
  );

  useEffect(() => {
    if (i18n.language && i18n.language !== 'fi') {
      setMapStyle('mapbox://styles/strawshield/cjxx3eh3t2oib1cpm9fxw4i9j');
    } else {
      setMapStyle('mapbox://styles/strawshield/cjxx7z1sf04rm1dl7bjryf4xf');
    }
  }, [i18n.language]);

  const _renderMarker = () => {
    return (
      displayedPoints &&
      displayedPoints.map((point, index) => {
        const isActive =
          queryString.parse(location.search).name ===
            point.properties.fi.name ||
          queryString.parse(location.search).tag === point.properties.fi.name;

        const isTag = point.properties.type === 'island';

        const query = isTag
          ? queryString.stringify({
              tag: point.properties.fi.name,
            })
          : queryString.stringify({
              ...queryString.parse(location.search),
              name: point.properties.fi.name,
            });
        return (
          <Marker
            key={`marker-${index}`}
            longitude={point.geometry.coordinates[0]}
            latitude={point.geometry.coordinates[1]}
          >
            <CityPin
              isActive={isActive}
              isTag={isTag}
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
    <ReactMapGL
      ref={map}
      {...viewport}
      onViewportChange={viewport => setViewport(viewport)}
      mapStyle={mapStyle}
      mapboxApiAccessToken={process.env.REACT_APP_ACCESSTOKEN}
      className="map"
    >
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      {_renderMarker()}
    </ReactMapGL>
  );
};
