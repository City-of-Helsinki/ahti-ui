import React, { Suspense } from 'react';
import CookieConsent from 'react-cookie-consent';
import MapPage from '../../Components/MapPage/MapPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../home/Home';
import { useTranslation } from 'react-i18next';
import ApplicationHeader from '../header/ApplicationHeader';
import mapData from '../../data/mapData.json';
import lineData from '../../data/lineData.json';
import mapIslandData from '../../data/mapIslandData.json';
import { ThemeProvider } from 'styled-components';
import withTracker from '../../common/utils/withTracker';
import ScrollToTop from '../../common/utils/ScrollToTop';
import theme from '../../common/constants/theme';
import graphQLClient from '../api/client';
import { ApolloProvider } from '@apollo/react-hooks';

export const GlobalGeoContext = React.createContext<any[]>(mapData.features);
export const GlobalLineContext = React.createContext<any[]>(lineData.data);
export const GlobalIslandContext = React.createContext<any[]>(
  mapIslandData.data
);

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ThemeProvider theme={theme}>
      <GlobalGeoContext.Provider value={mapData.features}>
        <GlobalLineContext.Provider value={lineData.data}>
          <GlobalIslandContext.Provider value={mapIslandData.data}>
            <ApolloProvider client={graphQLClient}>
              <Router>
                <CookieConsent
                  buttonText={t('cookie_consent.button')}
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
                  {t('cookie_consent.text')}
                </CookieConsent>
                <ScrollToTop>
                  <header>
                    <ApplicationHeader />
                  </header>

                  {/* NOTE: Make sure to wrap any other Route components withTracker.
                   * An alternative might be to set up a top-level route and only wrap that.
                   */}
                  <Suspense fallback={<div />}>
                    <Route exact path="/" component={withTracker(Home)} />
                    <Route path="/map" component={withTracker(MapPage)} />
                  </Suspense>
                </ScrollToTop>
              </Router>
            </ApolloProvider>
          </GlobalIslandContext.Provider>
        </GlobalLineContext.Provider>
      </GlobalGeoContext.Provider>
    </ThemeProvider>
  );
};

export default App;
