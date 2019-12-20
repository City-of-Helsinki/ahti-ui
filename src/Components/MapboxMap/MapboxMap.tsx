import React, { useMemo, useState, useEffect, useRef } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import PointPin from '../MapPins/PointPin';
import ClusterPin from '../MapPins/ClusterPin';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import Cluster from '../Cluster/Cluster';
import { getPointQuery } from '../../common/utils/utils';
import AhtiNavigationControl from './controls/AhtiNavigationControl';
import AhtiGeolocateControl from './controls/AhtiGeolocateControl';
import styles from './MapboxMap.module.scss';
import mapStyle from '../../assets/mapStyle.json';

// using ReactMapGL might not be the most optimal for us, there is a plan to put it on a new componnets in the futyre
const MapboxMap = ({
  viewport,
  setViewport,
  displayedPoints,
  history,
  location,
  flyToPoint,
  currentSlide,
}: {
  viewport: any;
  setViewport: any;
  displayedPoints: any;
  history: any;
  location: any;
  flyToPoint: any;
  currentSlide: any;
}) => {
  const { t, i18n } = useTranslation();
  const map = useRef<any>(null);
  const parsedSearch = useMemo(() => queryString.parse(location.search), [
    location.search,
  ]);
  const [mapStyle, setMapStyle] = useState(getMapStyle('fi'));

  useEffect(() => {
    setMapStyle(getMapStyle(i18n.language));
  }, [i18n.language]);

  const _renderMarker = () => {
    return (
      displayedPoints &&
      displayedPoints.map((point: any, index: any) => {
        const isActive =
          parsedSearch.name === point.properties.name || index === currentSlide;

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

  const getNavigationControl = () => {
    // @ts-ignore
    // eslint-disable-next-line
    return <AhtiNavigationControl zoomInLabel={t('map.zoom_in')} zoomOutLabel={t('map.zoom_out')} />
  };

  const getGeolocateControl = () => {
    const noop = () => {};
    // @ts-ignore
    // eslint-disable-next-line
    return <AhtiGeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} onViewportChange={noop} label={t('map.geolocate')} />
  };

  return (
    <MapGL
      {...viewport}
      ref={map}
      mapStyle={mapStyle}
      onViewportChange={viewport => setViewport(viewport)}
      clickRadius={10}
      onResize={() => setViewport(viewport)}
    >
      <div className={styles.geolocateControls}>
        {getGeolocateControl()}
        <div className={styles.geolocateControlsDivider} />
        {getNavigationControl()}
      </div>
      {map.current && (
        <Cluster
          map={map.current.getMap()}
          radius={30}
          extent={512}
          nodeSize={40}
          minZoom={0}
          maxZoom={10}
          currentSlide={currentSlide}
          element={(e: any) => {
            return <ClusterPin {...e} flyToPoint={flyToPoint} />;
          }}
        >
          {_renderMarker()}
        </Cluster>
      )}
    </MapGL>
  );
};

// Utils
function getMapStyle(language: string) {
  let style;
  if (language !== 'fi') {
    style = mapStyle;
  } else {
    style = mapStyle;
  }
  style = {
    ...style,
    sprite:
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '') +
      '/sprites/ahti-sprite',
  };
  return style;
}

export default MapboxMap;
