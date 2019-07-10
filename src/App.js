import React, { useState, useEffect } from 'react';
import MapboxMap from './Components/MapboxMap/MapboxMap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import Home from './Components/Home/Home';

export default () => {
  const [pointData, setPointData] = useState([]);

  useEffect(() => {
    import('./mapData.json').then(data => {
      setPointData(data.default.features);
    });
  }, [pointData]);

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
      <Route exact path="/" component={() => <Home pointData={pointData} />} />
      <Route
        path="/map"
        component={() => <MapboxMap pointData={pointData} />}
      />
    </Router>
  );
};
