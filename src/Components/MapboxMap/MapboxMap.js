import React, { useState, useEffect, useRef } from 'react';
import MapGL, { Marker, Popup, GeolocateControl } from 'react-map-gl';
import CityPin from '../Utils/city-pin';
import CityInfo from '../Utils/city-info';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTranslation } from 'react-i18next';

export default ({ viewport, setViewport, displayedPoints, history }) => {
  const { t, i18n } = useTranslation();
  const map = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    'mapbox://styles/strawshield/cjxx7z1sf04rm1dl7bjryf4xf'
  );
  const [popupInfo, setPopupInfo] = useState(null);

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
      displayedPoints.map((point, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={point.geometry.coordinates[0]}
          latitude={point.geometry.coordinates[1]}
        >
          <CityPin
            size={20}
            onClick={() => {
              setPopupInfo(point);
              history.push(`/map?name=${point.properties.name}`);
            }}
          />
        </Marker>
      ))
    );
  };

  const _renderPopup = () => {
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.geometry.coordinates[0]}
          latitude={popupInfo.geometry.coordinates[1]}
          closeOnClick={false}
          onClose={() => {
            setPopupInfo(null);
            history.push('/map');
          }}
        >
          <CityInfo info={popupInfo.properties} />
        </Popup>
      )
    );
  };

  return (
    <React.Fragment>
      <MapGL
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
        {_renderPopup()}
      </MapGL>
      <h2>{t('Greetings')}</h2>
    </React.Fragment>
  );
};
