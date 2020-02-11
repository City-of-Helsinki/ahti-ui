import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import graphQLClient from '../api';
import { useFeaturesQuery } from '../api/generated/types.d';

const FeatureList: React.FC = () => {
  const { data } = useFeaturesQuery();
  return (
    <ul>
      {data?.features?.edges?.map((feature, id) => (
        <li key={id}>{feature?.node?.properties?.name}</li>
      ))}
    </ul>
  );
};

const App: React.FC = () => {
  return (
    <ApolloProvider client={graphQLClient}>
      <FeatureList />
    </ApolloProvider>
  );
};

export default App;
