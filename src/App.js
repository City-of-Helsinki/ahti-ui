import React from 'react';
import MapPage from './Components/MapPage/MapPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import Home from './Components/Home/Home';
import { withTranslation } from 'react-i18next';

export const GlobalGeoContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointData: [],
    };
  }

  componentDidMount() {
    import('./mapData.json').then(data => {
      this.setState({
        pointData: data.default.features,
      });
    });
  }

  render() {
    const { i18n } = this.props;

    return (
      <GlobalGeoContext.Provider value={this.state.pointData}>
        <Router>
          <div>
            <Link to="/">
              <Header as="h3">Home</Header>
            </Link>
            <Link to="/map">
              <Header as="h3">Map</Header>
            </Link>
            <button onClick={() => i18n.changeLanguage('en')}>en</button>
            <button onClick={() => i18n.changeLanguage('fi')}>fi</button>
          </div>
          <Route exact path="/" component={() => <Home />} />
          <Route path="/map" component={() => <MapPage />} />
        </Router>
      </GlobalGeoContext.Provider>
    );
  }
}

export default withTranslation()(App);
