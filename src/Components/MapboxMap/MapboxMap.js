import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import MapGL, { Marker, Popup } from 'react-map-gl';
import { Header } from 'semantic-ui-react';
import CityPin from '../Utils/city-pin';
import CityInfo from '../Utils/city-info';
import queryString from 'query-string';
import 'mapbox-gl/dist/mapbox-gl.css';
import AppContext from '../../App';

export default withRouter(({ location, history }) => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 60.15,
    longitude: 24.944,
    zoom: 10,
    minzoom: 3,
    maxzoom: 9,
    bearing: 0,
    pitch: 0,
  });
  const [displayedPoints, setDisplayedPoints] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);

  const geoData = useContext(AppContext);

  useEffect(() => {
    const query = queryString.parse(location.search);
    let filteredPoints = geoData;

    if (query.collection) {
      filteredPoints = filteredPoints.filter(
        point => point.properties.type === query.collection
      );
    }
    if (query.name) {
      filteredPoints = filteredPoints.filter(
        point => point.properties.name === query.name
      );
    }
    setDisplayedPoints(filteredPoints);
  }, [location, geoData]);

  const _renderCityMarker = (city, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={city.geometry.coordinates[0]}
        latitude={city.geometry.coordinates[1]}
      >
        <CityPin
          size={20}
          onClick={() => {
            setPopupInfo(city);
            history.push(`/map?name=${city.properties.name}`);
          }}
        />
      </Marker>
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
      <Header as="h4">
        Displayed collection: {queryString.parse(location.search).collection}
      </Header>
      <MapGL
        {...viewport}
        onViewportChange={viewport => setViewport(viewport)}
        mapStyle="mapbox://styles/ohel/cjxodqmm92eao1cqnjz85qnww"
        mapboxApiAccessToken={process.env.REACT_APP_ACCESSTOKEN}
        className="map"
      >
        {displayedPoints && displayedPoints.map(_renderCityMarker)}
        {_renderPopup()}
      </MapGL>
    </React.Fragment>
  );
});
