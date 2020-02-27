import React from 'react';
import ListView from './ListView';
import { useFeaturesQuery } from '../../../domain/api/generated/types.d';
import { ApolloProvider } from '@apollo/react-common';
import graphQLClient from '../../../domain/api';
import { featuresLens } from '../../utils/lenses';
import mockFeature from './__tests__/mockFeature';

export default {
  title: 'ListView',
  component: ListView,
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <ApolloProvider client={graphQLClient}>{storyFn()}</ApolloProvider>
    )
  ]
};

export const MockedFeatures = () => {
  return <ListView features={Array(10).fill(mockFeature)} />;
};

MockedFeatures.story = {
  name: 'Mocked data'
};

const TwentyFeatures = () => {
  const { data } = useFeaturesQuery();
  return (
    <>{data && <ListView features={featuresLens.get(data).slice(0, 20)} />}</>
  );
};

// The component needs to be wrapped,
// otherwise the decorator doesn't get applied for whatever reason.
export const TwentyFeaturesWrapper = () => {
  return <TwentyFeatures />;
};

TwentyFeaturesWrapper.story = {
  name: '20 Features'
};
