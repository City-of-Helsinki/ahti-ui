import React, { useMemo, useState, useEffect, useRef } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import PointPin from '../MapPins/PointPin';
import ClusterPin from '../MapPins/ClusterPin';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTranslation } from 'react-i18next';
import queryString from 'query-string';
import Cluster from '../Cluster/Cluster';
import {
  getPointQuery,
  getLineQuery,
  getIslandQuery,
} from '../../common/utils/utils';

import AhtiNavigationControl from './controls/AhtiNavigationControl';
import AhtiGeolocateControl from './controls/AhtiGeolocateControl';
import styles from './MapboxMap.module.scss';

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
  const [mapStyle, setMapStyle] = useState(getMapStyleUrl('fi'));

  useEffect(() => {
    setMapStyle(getMapStyleUrl(i18n.language));
  }, [i18n.language]);

  // Update line width for active line, or reset it to 3, if not.
  // NOTE: There seems to be a timing bug, when you zoom in quickly
  // and then tap on a route. When that happens, the line style might
  // not change. We suspect this is because of the map style or tiles
  // loading, but have not figured out what.
  const paintLineStyles = (parsedSearch: queryString.ParsedQuery<string>) => {
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

  const _onClick = (event: { features: any }) => {
    const { features } = event;
    const clickedPlace =
      features &&
      features.find((f: { layer: { id: string } }) =>
        ['routes', 'islands'].includes(f.layer.id)
      );

    clickedPlace &&
      clickedPlace.properties.name &&
      (clickedPlace.layer.id === 'routes'
        ? history.push(`/map?${getLineQuery(clickedPlace, parsedSearch)}`)
        : history.push(`/map?${getIslandQuery(clickedPlace, parsedSearch)}`));
  };

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
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}
      onViewportChange={viewport => setViewport(viewport)}
      onNativeClick={_onClick}
      clickRadius={10}
      onLoad={() => paintLineStyles(parsedSearch)}
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
function getMapStyleUrl(language: string) {
  if (language !== 'fi') {
    return 'mapbox://styles/ahie/ck4bh3x1h274o1cqgfa90hslu';
  } else {
    return 'mapbox://styles/ahie/ck4bh3x1h274o1cqgfa90hslu';
  }
}

export default MapboxMap;
