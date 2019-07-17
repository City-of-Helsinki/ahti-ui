import React, { useState, useEffect, useRef } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import CityPin from '../Utils/city-pin';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import Cluster from '../Cluster/Cluster';

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
    <React.Fragment>
      <MapGL
        {...viewport}
        ref={map}
        mapStyle={mapStyle}
        mapboxApiAccessToken={process.env.REACT_APP_ACCESSTOKEN}
        onViewportChange={viewport => setViewport(viewport)}
      >
        {map.current && (
          <Cluster
            map={map.current.getMap()}
            radius={20}
            extent={512}
            nodeSize={40}
            element={e => {
              return <CityPin {...e} isActive={true} isTag={true} />;
            }}
          >
            {displayedPoints.map((point, i) => (
              <Marker
                key={i}
                longitude={point.geometry.coordinates[0]}
                latitude={point.geometry.coordinates[1]}
              >
                <CityPin isActive={false} isTag={false} />
              </Marker>
            ))}
          </Cluster>
        )}
      </MapGL>
      {/* <MapGL
        ref={map}
        {...viewport}
        onViewportChange={viewport => setViewport(viewport)}
        mapStyle={mapStyle}
        mapboxApiAccessToken={process.env.REACT_APP_ACCESSTOKEN}
        className="map"
      >
        />
        {_renderMarker()}
      </MapGL>
      <h2>{t('Greetings')}</h2> */}
    </React.Fragment>
  );
};
