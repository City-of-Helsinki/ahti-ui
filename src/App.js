import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
// import MapboxMap from './Components/MapboxMap/MapboxMap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import Slider from 'react-slick';

const MapboxMap = lazy(() => import('./Components/MapboxMap/MapboxMap'));

const AppContext = React.createContext();
export { AppContext };

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

export default () => {
  const [geoData, setGeoData] = useState([]);

  useEffect(() => {
    import('./mapData.json').then(data => {
      setGeoData(data.default.features);
    });
  }, [geoData]);

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
      <Suspense fallback={<div>Map Data Loading...</div>}>
        <AppContext.Provider value={geoData}>
          <Route
            exact
            path="/"
            component={() => (
              <div>
                <Header as="h1">Discover</Header>
                <div>
                  {useContext(AppContext) &&
                    [
                      ...new Set(
                        useContext(AppContext).map(
                          point => point.properties.type
                        )
                      ),
                    ].map((point, id) => (
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
          <Route path="/map" component={() => <MapboxMap />} />
        </AppContext.Provider>
      </Suspense>
    </Router>
  );
};
