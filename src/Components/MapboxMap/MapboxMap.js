import React, { useState, useRef } from 'react';
import MapGL, { Marker, Popup, GeolocateControl } from 'react-map-gl';
import CityPin from '../Utils/city-pin';
import CityInfo from '../Utils/city-info';
import 'mapbox-gl/dist/mapbox-gl.css';

export default ({ viewport, setViewport, displayedPoints, history }) => {
  const map = useRef(null);

  const [popupInfo, setPopupInfo] = useState(null);

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
        mapStyle="mapbox://styles/ohel/cjxodqmm92eao1cqnjz85qnww"
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
    </React.Fragment>
  );
};
