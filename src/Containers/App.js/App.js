import React, { useState } from 'react'
import MapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { accessToken } from '../../config'
import styles from './App.module.css'
import asd from '../../resources/style.json'
import { fromJS } from 'immutable';
import MAP_STYLE from '../../resources/defaultMapStyle.json'

export default () => {

  const [viewport, setViewport] = useState({
    latitude: 60.15,
    longitude: 24.944,
    zoom: 10,
    bearing: 0,
    pitch: 0
  })

  const [popupInfo, setPopupInfo] = useState(null)

  const _onClick = event => {
    const feature = event.features && event.features[0]

    if (feature.layer.id === "turvalaitteet-0-94xdva") {
      const { NIMIS } = feature.properties
      const longitude = feature.geometry.coordinates[0]
      const latitude = feature.geometry.coordinates[1]
      setPopupInfo({
        longitude,
        latitude,
        NIMIS
      })
    }
  };

  const _renderPopup = () => {
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={true}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            <p>Tää on popup</p>
            <p>{popupInfo.NIMIS}</p>
          </div>
        </Popup>
      )
    );
  }

  return (
    <div className={styles.container}>
      <MapGL
        onLoad={(map) => console.log(map.target.getStyle().layers)}
        {...viewport}
        mapStyle="mapbox://styles/ohel/cjxlhu6ec0ovd1dlmhs284s73"//mapbox://styles/ohel/cjxlhu6ec0ovd1dlmhs284s73"
        mapboxApiAccessToken={accessToken}
        width="100%"
        height="100%"
        onViewportChange={(viewport) => setViewport(viewport)}
        clickRadius={2}
        onClick={_onClick}
      >
        {_renderPopup()}
      </MapGL>
    </div>
  )
}