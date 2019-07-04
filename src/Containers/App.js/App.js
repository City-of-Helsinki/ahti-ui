import React, { useState, useEffect } from 'react'
import MapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { accessToken } from '../../config'
import styles from './App.module.css'
import asd from '../../resources/style.json'
import { fromJS } from 'immutable';
import MAP_STYLE from '../../resources/defaultMapStyle.json'
import firebase from '../../services/firebase'
import CityPin from '../city-pin';

export default () => {

  const [viewport, setViewport] = useState({
    latitude: 60.15,
    longitude: 24.944,
    zoom: 10,
    bearing: 0,
    pitch: 0,
    minzoom: 3,
    maxzoom: 9,
  })

  const [map, setMap] = useState({})
  const [routeFilter, setRouteFilter] = useState(['!has', 'start_id'])
  const [routeData, setRouteData] = useState([])
  const [popupInfo, setPopupInfo] = useState(null)
  const [markerInfo, setMarkerInfo] = useState(null)
  const [pointData, setPointData] = useState([])

  useEffect(() => {
    firebase().getData().then(data => {
      setPointData(data)
    })
  }, [])


  const toggleFilter = (start_id) => {

    const currentFilter = map.getFilter('testi')
    map.setFilter('testi', ['==', 'start_id', start_id])
    if (currentFilter) {
      console.log(currentFilter)
      console.log(routeFilter)
      console.log(currentFilter == routeFilter)
      map.setFilter('testi', ['==', 'start_id', start_id])
      map.setFilter('testi', routeFilter)
      
    }
  }

  const _onClick = event => {
    console.log("moro")
    const feature = event.features && event.features[0]

    if (feature) {


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
    }
  };

  const _markerOnCLick = event => {
    console.log(event)
    const feature = event.features && event.features[0]

  }

  const _renderPopup = () => {
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={markerInfo.longitude}
          latitude={markerInfo.latitude}
          closeOnClick={true}
          onClose={() => setMarkerInfo(null)}
        >
          <div>
            <p>Tää on popup</p>
            <p>moromoro</p>
          </div>
        </Popup>
      )
    );
  }

  const _renderMarker = () => {
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
        onLoad={(mapObject) => {
          //console.log(map.target.getStyle().layers.filter(layer => layer.id === "testi")[0])
          //console.log(map.target.queryRenderedFeatures({ layers: ["testi"] }))
          //setRouteData(map.target.queryRenderedFeatures({ layers: ["testi"] }))
          setMap(mapObject.target)
        }}
        {...viewport}
        mapStyle="mapbox://styles/ohel/cjxodqmm92eao1cqnjz85qnww"//{asd}//mapbox://styles/ohel/cjxlhu6ec0ovd1dlmhs284s73"
        mapboxApiAccessToken={accessToken}
        width="100%"
        height="100%"
        onViewportChange={(viewport) => setViewport(viewport)}
        clickRadius={2}
        onClick={_onClick}
      >
        {_renderPopup()}
        {_renderMarker()}

        {pointData.map((point, index) =>
          <Marker key={`marker-${index}`} longitude={point.location.longitude} latitude={point.location.latitude}>
            {/* <CityPin size={50} onClick={() => console.log(point.name)}/> */}
            <img
              src="https://images.unsplash.com/photo-1562047330-8c629310c0d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80"
              style={{
                width: "50px",
                height: "50px"
              }}
              onClick={() => {
                console.log(point.name)
                point.name === "Minna" ? toggleFilter(1) : toggleFilter(4)
              }}
            />
          </Marker>
        )}
      </MapGL>
    </div>
  )
}