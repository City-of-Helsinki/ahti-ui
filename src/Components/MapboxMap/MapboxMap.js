import React, { useState, useEffect, useRef } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import PointPin from '../MapPins/PointPin';
import TagPin from '../MapPins/TagPin';
import ClusterPin from '../MapPins/ClusterPin';
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
            {isTag ? (
              <TagPin
                isActive={isActive}
                onClick={() => {
                  history.push(`/map?${query}`);
                }}
              />
            ) : (
              <PointPin
                isActive={isActive}
                onClick={() => {
                  history.push(`/map?${query}`);
                }}
              />
            )}
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
            radius={40}
            extent={512}
            nodeSize={40}
            element={e => {
              return <ClusterPin {...e} />;
            }}
          >
            {_renderMarker()}
          </Cluster>
        )}
      </MapGL>
    </React.Fragment>
  );
};
