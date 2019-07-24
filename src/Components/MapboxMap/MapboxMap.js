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
  flyToPoint,
  currentSlide,
}) => {
  const { t, i18n } = useTranslation();
  const map = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/strawshield/cjy8e6acb03ff1cobkxdh1cjv'
  );

  useEffect(() => {
    if (i18n.language && i18n.language !== 'fi') {
      // replace with mapstyle in English
      setMapStyle('mapbox://styles/strawshield/cjy8e6acb03ff1cobkxdh1cjv');
    } else {
      setMapStyle('mapbox://styles/strawshield/cjy8e6acb03ff1cobkxdh1cjv');
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

        const isCurrent = index === currentSlide;

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
                isCurrent={isCurrent}
                onClick={() => {
                  history.push(`/map?${query}`);
                }}
              />
            ) : (
              <PointPin
                isActive={isActive}
                isCurrent={isCurrent}
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
            radius={30}
            extent={512}
            nodeSize={40}
            minZoom={0}
            maxZoom={13}
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
