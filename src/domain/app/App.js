import React, { Suspense } from 'react';
import CookieConsent from 'react-cookie-consent';
import MapPage from '../../Components/MapPage/MapPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../../Components/Home/Home';
import { withTranslation } from 'react-i18next';
import ApplicationHeader from '../../Components/ApplicationHeader/ApplicationHeader';
import mapData from '../../data/mapData.json';
import lineData from '../../data/lineData.json';
import mapIslandData from '../../data/mapIslandData.json';
import { ThemeProvider } from 'styled-components';
import withTracker from '../../common/utils/withTracker';
import ScrollToTop from '../../common/utils/ScrollToTop';
export const GlobalGeoContext = React.createContext();
export const GlobalLineContext = React.createContext();
export const GlobalIslandContext = React.createContext();
export const POINT_TYPES = [
  'island',
  'route',
  'cityboat',
  'sauna',
  'rent',
  'sup',
  'experience',
  'charter',
  'sightseeing',
  'learn',
  'taxi',
  'visitor',
  'station',
];

const theme = {
  secondaryColor: 'white',
  primaryColor: 'red',
  borderColor: '#ccc',
  fonts: {
    fontFamilyRegular: 'Helsinki Grotesk Regular',
    fontFamilyBold: 'Helsinki Grotesk Bold',
  },
  colors: {
    transparent: 'transparent',
    white: '#FFFFFF',
    black: '#001A33',
    pink: '#FADCE8',
    lightGray: '#E9EFF3',
    lightYellow: '#FCEA82',
  },
  borders: {
    buttonBorder: '2px solid #001A33',
  },
  shadows: {
    menuShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  gradients: {
    blockGradient:
      'linear-gradient(360deg, #DEE7ED 0%, rgba(255, 255, 255, 0) 99.98%, rgba(255, 255, 255, 0) 100%);',
    verticalBlockGradient:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 18.55%);',
  },
};

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalGeoContext.Provider value={mapData.features}>
          <GlobalLineContext.Provider value={lineData.data}>
            <GlobalIslandContext.Provider value={mapIslandData.data}>
              <Router>
                <CookieConsent
                  buttonText={this.props.t('cookie_consent.button')}
                  style={{
                    background: theme.colors.lightGray,
                    color: theme.colors.black,
                    font: theme.fonts.fontFamilyBold,
                    fontSize: '1.2rem',
                  }}
                  buttonStyle={{
                    background: theme.colors.transparent,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    border: theme.borders,
                    borderColor: theme.colors.black,
                  }}
                >
                  {this.props.t('cookie_consent.text')}
                </CookieConsent>
                <ScrollToTop>
                  <header>
                    <ApplicationHeader />
                  </header>

                  {/* NOTE: Make sure to wrap any other Route components withTracker.
                   * An alternative might be to set up a top-level route and only wrap that.
                   */}
                  <Suspense>
                    <Route exact path="/" component={withTracker(Home)} />
                    <Route path="/map" component={withTracker(MapPage)} />
                  </Suspense>
                </ScrollToTop>
              </Router>
            </GlobalIslandContext.Provider>
          </GlobalLineContext.Provider>
        </GlobalGeoContext.Provider>
      </ThemeProvider>
    );
  }
}

export default withTranslation()(App);