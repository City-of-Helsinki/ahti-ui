import React from 'react';
import Search from './Search';
import { ApolloProvider } from '@apollo/react-common';
import graphQLClient from '../../../domain/api';

export default {
  title: 'Search',
  component: Search,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <ApolloProvider client={graphQLClient}>{storyFn()}</ApolloProvider>
    )
  ]
};

export const DefaultSearch = () => (
  <Search
    onSelect={item => {
      alert(`clicked: ${item}`);
    }}
  />
);

DefaultSearch.story = {
  name: 'Default Search'
};
