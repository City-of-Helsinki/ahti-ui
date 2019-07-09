import React, { useState, useEffect, useRef } from 'react';

import firebase from './DataServices/firebase';
import CityPin from './Components/Utils/city-pin';
import MapboxMap from './Components/MapboxMap/MapboxMap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Header, Card, Icon, Image } from 'semantic-ui-react';
import Slider from 'react-slick';

const defaultViewport = {
  latitude: 60.15,
  longitude: 24.944,
  zoom: 10,
  bearing: 0,
  pitch: 0,
  minzoom: 3,
  maxzoom: 9,
};

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

export default () => {
  const map = useRef(null);
  const [viewport, setViewport] = useState(defaultViewport);
  const [popupInfo, setPopupInfo] = useState(null);
  const [pointData, setPointData] = useState([]);

  useEffect(() => {
    // firebase()
    //   .getData()
    //   .then(data => {
    //     setPointData(data);
    //   });

    import('./data.json').then(data => setPointData(data.default.locations));
  }, []);

  const _renderPopup = () => {
    return null;
    // return (
    //   popupInfo && (
    //     <Popup
    //       tipSize={5}
    //       anchor="top"
    //       longitude={popupInfo.longitude}
    //       latitude={popupInfo.latitude}
    //       closeOnClick={true}
    //       closeButton={false}
    //       onClose={() => setPopupInfo(null)}
    //     >
    //       <div>
    //         <p>Tää on popup</p>
    //         <p>{popupInfo.text}</p>
    //       </div>
    //     </Popup>
    //   )
    // );
  };

  const _markerOnClick = point => {
    const { longitude, latitude } = point.location;
    setPopupInfo({
      longitude,
      latitude,
      text: point.name,
    });
  };

  return (
    <Router>
      <div>
        <Link to="/">
          <Header as="h3">Home</Header>
        </Link>
        <Link to="/map">
          <Header as="h3">Map</Header>
        </Link>
      </div>
      <Route
        exact
        path="/"
        component={() => (
          // <Card>
          //   <Image src="/images/avatar/large/matthew.png" wrapped ui={false} />
          //   <Card.Content>
          //     <Card.Header>Matthew</Card.Header>
          //     <Card.Meta>
          //       <span className="date">Joined in 2015</span>
          //     </Card.Meta>
          //     <Card.Description>
          //       Matthew is a musician living in Nashville.
          //     </Card.Description>
          //   </Card.Content>
          // </Card>
          <div>
            <Header as="h1">Discover</Header>
            <div>
              {pointData.map((point, id) => {
                return (
                  <React.Fragment>
                    <Link to={`/locations/${id}`}>
                      <Header as="h3">{point.name}</Header>
                    </Link>
                    <div key={id}>
                      <Slider {...settings}>
                        {point.items.map((item, ind) => {
                          return <p>{item.name}</p>;
                        })}
                      </Slider>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      />
      <Route path="/map" component={MapboxMap} />

      {/* <MapGL
        ref={map}
        {...viewport}
        mapStyle="mapbox://styles/ohel/cjxodqmm92eao1cqnjz85qnww"
        mapboxApiAccessToken={process.env.REACT_APP_ACCESSTOKEN}
        width="100%"
        height="100%"
        onViewportChange={viewport => setViewport(viewport)}
        clickRadius={2}
      >
        {_renderPopup()}

        {pointData.map((point, index) => (
          <Marker
            key={`marker-${index}`}
            longitude={point.location.longitude}
            latitude={point.location.latitude}
          >
            <CityPin size={50} onClick={() => _markerOnClick(point)} />
          </Marker>
        ))}
      </MapGL> */}
    </Router>
  );
};
