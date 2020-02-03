import React, { Suspense } from 'react';
import CookieConsent from 'react-cookie-consent';
import MapPage from '../../Components/MapPage/MapPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomeWrapper } from '../home/Home';
import { useTranslation } from 'react-i18next';
import Menu from '../menu/Menu';
import { ThemeProvider } from 'styled-components';
import withTracker from '../../common/utils/withTracker';
import ScrollToTop from '../../common/utils/ScrollToTop';
import theme from '../../common/constants/theme';
import graphQLClient from '../api/client';
import { ApolloProvider } from '@apollo/react-hooks';

const App: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ThemeProvider theme={theme}>
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
              <Menu />
            </header>

            {/* NOTE: Make sure to wrap any other Route components withTracker.
             * An alternative might be to set up a top-level route and only wrap that.
             */}
            <Suspense fallback={<div />}>
              <Route exact path="/" component={withTracker(HomeWrapper)} />
              <Route path="/map" component={withTracker(MapPage)} />
            </Suspense>
          </ScrollToTop>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
