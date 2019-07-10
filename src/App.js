import React, { useState, useEffect } from 'react';
import MapboxMap from './Components/MapboxMap/MapboxMap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import Slider from 'react-slick';

var settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

export default () => {
  const [pointData, setPointData] = useState([]);

  useEffect(() => {
    import('./mapData.json').then(data => {
      setPointData(data.default.features);
    });
  }, [pointData]);

  const dataTypes = () => {
    return [...new Set(pointData.map(point => point.properties.type))];
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
          <div>
            <Header as="h1">Discover</Header>
            <div>
              {pointData &&
                dataTypes().map((point, id) => (
                  <Link
                    to={{
                      pathname: '/map',
                      search: `?collection=${point}`,
                    }}
                    key={id}
                  >
                    <Header as="h3">{point}</Header>
                  </Link>
                ))}
            </div>
          </div>
        )}
      />
      <Route
        path="/map"
        component={() => <MapboxMap pointData={pointData} />}
      />
    </Router>
  );
};
