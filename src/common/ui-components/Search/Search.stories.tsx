import React from 'react';
import { ApolloProvider } from '@apollo/react-common';

import Search from './Search';
import graphQLClient from '../../../domain/api';

export default {
  title: 'Search',
  component: Search,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <ApolloProvider client={graphQLClient}>{storyFn()}</ApolloProvider>
    ),
  ],
};

export const DefaultSearch = () => (
  <Search
    featuresToSearch={[]}
    onSelect={(item) => {
      alert(`clicked: ${item}`);
    }}
    onClose={() => {
      /* noop */
    }}
  />
);

DefaultSearch.story = {
  name: 'Default Search',
};
