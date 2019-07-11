import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import MapGL, {
  Marker,
  Popup,
  FlyToInterpolator,
  GeolocateControl,
} from 'react-map-gl';
import { Header } from 'semantic-ui-react';
import CityPin from '../Utils/city-pin';
import CityInfo from '../Utils/city-info';
import queryString from 'query-string';
import Slider from 'react-slick';
import 'mapbox-gl/dist/mapbox-gl.css';

export default withRouter(({ pointData, location, history }) => {
  const map = useRef(null);
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

  useEffect(() => {
    const query = queryString.parse(location.search);
    let filteredPoints = pointData;

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
  }, [location, pointData]);

  const sliderSettings = {
    dots: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => {
      if (displayedPoints[next]) {
        const longitude = displayedPoints[next].geometry.coordinates[0];
        const latitude = displayedPoints[next].geometry.coordinates[1];
        setViewport({
          longitude,
          latitude,
          zoom: 15,
          transitionInterpolator: new FlyToInterpolator(),
          transitionDuration: 2000,
        });
      }
    },
  };

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

  const _renderSlider = () => {
    return (
      displayedPoints && (
        <Slider {...sliderSettings}>
          {displayedPoints.map((point, id) => (
            <div key={id}>
              <Header as="h3">{point.properties.name}</Header>
            </div>
          ))}
        </Slider>
      )
    );
  };

  return (
    <React.Fragment>
      <Header as="h4">
        Displayed collection: {queryString.parse(location.search).collection}
      </Header>
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
        {/* {map.current && console.log(map.current.getMap().setLayoutProperty)} */}
      </MapGL>
      {_renderSlider()}
    </React.Fragment>
  );
});
