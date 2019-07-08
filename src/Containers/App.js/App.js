import React, { useState, useEffect, useRef } from 'react'
import MapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { accessToken } from '../../config'
import styles from './App.module.css'
import firebase from '../../services/firebase'
import CityPin from '../city-pin'

const defaultViewport = {
  latitude: 60.15,
  longitude: 24.944,
  zoom: 10,
  bearing: 0,
  pitch: 0,
  minzoom: 3,
  maxzoom: 9,
}

export default () => {
  const map = useRef(null)
  const [viewport, setViewport] = useState(defaultViewport)
  const [popupInfo, setPopupInfo] = useState(null)
  const [pointData, setPointData] = useState([])

  useEffect(() => {
    firebase().getData().then(data => {
      setPointData(data)
    })
  }, [])

  const _renderPopup = () => {
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={true}
          closeButton={false}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            <p>Tää on popup</p>
            <p>{popupInfo.text}</p>
          </div>
        </Popup>
      )
    )
  }

  const _markerOnClick = point => {
    const { longitude, latitude } = point.location
    setPopupInfo({
      longitude,
      latitude,
      text: point.name
    })
  }

  return (
    <div className={styles.container}>
      <MapGL
        ref={map}
        {...viewport}
        mapStyle="mapbox://styles/ohel/cjxodqmm92eao1cqnjz85qnww"
        mapboxApiAccessToken={accessToken}
        width="100%"
        height="100%"
        onViewportChange={(viewport) => setViewport(viewport)}
        clickRadius={2}
      >
        {_renderPopup()}

        {pointData.map((point, index) =>
          <Marker key={`marker-${index}`} longitude={point.location.longitude} latitude={point.location.latitude}>
            <CityPin size={50} onClick={() => _markerOnClick(point)} />
          </Marker>
        )}
      </MapGL>
    </div>
  )
}