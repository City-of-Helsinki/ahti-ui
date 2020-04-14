import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';

import graphQLClient from '../api';
import { config } from '../overmind';
import Ahti from '../Ahti/Ahti';

const overmind = createOvermind(config);

// TODO: disable in dev once the app is in production.
const matomoInstance = createInstance({
  urlBase: 'https://analytics.hel.ninja/',
  siteId: 58,
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={graphQLClient}>
      <Provider value={overmind}>
        <Router>
          <MatomoProvider value={matomoInstance}>
            <Ahti />
          </MatomoProvider>
        </Router>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
