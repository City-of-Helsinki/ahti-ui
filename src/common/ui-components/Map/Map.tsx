import React, { useState, useRef } from 'react';
import MapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  StaticMap,
  FlyToInterpolator,
  TransitionInterpolator,
  EasingFunction,
  TRANSITION_EVENTS,
  PointerEvent,
} from 'react-map-gl';
import { BBox } from 'geojson';
import useSupercluster from 'use-supercluster';
import { useTranslation } from 'react-i18next';
import { PointFeature } from 'supercluster';

import { Feature } from '../../../domain/api/generated/types.d';
import {
  initialLatitude,
  initialLongitude,
  initialZoomLevel,
  maxZoomLevel,
  minZoomLevel,
  clusteringRadius,
  selectedFeatureZoomLevel,
  transitionDuration,
} from '../../../domain/constants';
import ClusterIcon from '../ClusterIcon/ClusterIcon';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './Map.module.scss';
import {
  getMapStyleWithRoutes,
  getFlyToPoint,
  getPoints,
  getRoutes,
} from './mapUtils';
import PinIcon from './PinIcon/PinIcon';

/*
// Approach for clustering used from here
// https://www.leighhalliday.com/mapbox-clustering
*/
interface MapProps {
  readonly className?: string;
  readonly features: Feature[];
  readonly selectedFeature?: Feature | null;
  onClick(feature: Feature): void;
}
type GeoJsonProperties = { cluster: boolean; itemId: string; category: string };
type ClusterProperties = GeoJsonProperties & { point_count: number };

type ViewportState = {
  width?: string | number;
  height?: string | number;
  latitude: number;
  longitude: number;
  zoom: number;
  minZoom: number;
  maxZoom: number;
  transitionInterpolator?: TransitionInterpolator;
  transitionDuration?: number | 'auto';
  transitionInterruption?: TRANSITION_EVENTS;
  transitionEasing?: EasingFunction;
  bearing?: number;
  pitch?: number;
  altitude?: number;
  maxPitch?: number;
  minPitch?: number;
};

const Map: React.FC<MapProps> = ({
  className,
  features,
  selectedFeature,
  onClick,
}) => {
  const points = getPoints(features);
  const routes = getRoutes(features, selectedFeature);
  const flyToPoint = getFlyToPoint(selectedFeature);

  const { t } = useTranslation();
  const [viewPort, setViewPort] = useState<ViewportState>({
    width: '100%',
    height: '100%',
    longitude: flyToPoint ? flyToPoint.longitude : initialLongitude,
    latitude: flyToPoint ? flyToPoint.latitude : initialLatitude,
    zoom: selectedFeature ? selectedFeatureZoomLevel : initialZoomLevel,
    minZoom: minZoomLevel,
    maxZoom: maxZoomLevel,
  });

  const onPointClick = (longitude: number, latitude: number, zoom?: number) => {
    window && window.scrollTo({ top: 0 });
    setViewPort({
      ...viewPort,
      longitude,
      latitude,
      zoom: zoom || viewPort.zoom + 1,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration,
    });
  };

  const mapRef = useRef<StaticMap>();
  const renderPin = (
    pointFeature: PointFeature<GeoJsonProperties>,
    id: number | string
  ) => {
    if (pointFeature.geometry.type !== 'Point') {
      return null;
    }

    const isSelected =
      pointFeature?.properties?.itemId === selectedFeature?.properties?.ahtiId;
    const feature = features.find(
      (feature) => feature.properties.ahtiId === pointFeature.properties.itemId
    );
    const onMarkerClick = () => {
      onClick(feature);
      onPointClick(
        feature.geometry.coordinates[0],
        feature.geometry.coordinates[1],
        viewPort.zoom > selectedFeatureZoomLevel
          ? viewPort.zoom
          : selectedFeatureZoomLevel
      );
    };
    const tags = feature?.properties?.tags?.map((tag) => tag.id);
    const category = feature?.properties?.category?.id;
    const all = tags ? [category, ...tags] : [category];
    return (
      <Marker
        key={`pin-${id}`}
        longitude={pointFeature.geometry.coordinates[0]}
        latitude={pointFeature.geometry.coordinates[1]}
      >
        <div onClick={onMarkerClick} className={styles.markerContent}>
          <PinIcon tags={all} />
        </div>
      </Marker>
    );
  };

  const getBounds: () => BBox | null = function () {
    const current = mapRef?.current;
    if (!current) return null;
    return current
      .getMap()
      .getBounds()
      .toArray()
      .reduce((acc, val) => acc.concat(val), []) as BBox;
  };
  const bounds = getBounds();
  const { clusters } = useSupercluster<GeoJsonProperties, ClusterProperties>({
    points,
    bounds,
    zoom: viewPort.zoom,
    options: { radius: clusteringRadius, maxZoom: viewPort.maxZoom },
  });

  const onMapClick = (event: PointerEvent) => {
    const clickedRoute =
      event.features &&
      event.features.find((feature) => 'route-line' === feature.layer.id);

    if (!clickedRoute) {
      return;
    }

    const clickedFeature = features.find(
      (feature) => feature.properties.ahtiId === clickedRoute.properties.ahtiId
    );

    if (clickedFeature) {
      onClick(clickedFeature);
    }
  };

  return (
    <MapGL
      {...viewPort}
      mapStyle={getMapStyleWithRoutes(routes)}
      width={'100%'}
      height={'100%'}
      className={className}
      ref={mapRef}
      onViewportChange={setViewPort}
      clickRadius={10}
      onNativeClick={onMapClick}
      attributionControl={null}
    >
      {clusters.map((cluster: any, id: number) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster } = cluster.properties;
        // this is temporary, new designs should come soon
        if (isCluster) {
          const {
            point_count: pointCount,
          } = cluster.properties as ClusterProperties;
          return (
            <Marker
              key={`cluster-${id}`}
              latitude={latitude}
              longitude={longitude}
            >
              <ClusterIcon
                pointCount={pointCount}
                onClick={() => onPointClick(longitude, latitude)}
              />
            </Marker>
          );
        } else {
          return renderPin(cluster as PointFeature<GeoJsonProperties>, id);
        }
      })}
      <div className={styles.mapControls}>
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          label={t('map.geolocate')}
        />
        <div className={styles.mapControlsDivider} />
        <NavigationControl
          zoomInLabel={t('map.zoom_in')}
          zoomOutLabel={t('map.zoom_out')}
          showCompass={false}
        />
      </div>
    </MapGL>
  );
};
export default Map;
