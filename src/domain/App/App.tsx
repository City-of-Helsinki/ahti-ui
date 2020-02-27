import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import { BrowserRouter as Router } from 'react-router-dom';

import graphQLClient from '../api';
import { config } from '../overmind';
import Ahti from '../Ahti/Ahti';
import Features from '../Ahti/Features';

const overmind = createOvermind(config);

const App: React.FC = () => {
  return (
    <ApolloProvider client={graphQLClient}>
      <Provider value={overmind}>
        <Features />
        <Router>
          <Ahti />
        </Router>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
