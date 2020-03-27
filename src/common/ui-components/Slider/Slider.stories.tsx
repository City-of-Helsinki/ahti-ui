import React from 'react';

import Slider from './Slider';

export default {
  title: 'Slider',
  component: Slider,
  //   decorators: [
  //     (storyFn: () => React.ReactNode) => (
  //       <ApolloProvider client={graphQLClient}>{storyFn()}</ApolloProvider>
  //     ),
  //   ],
};

export const SimpleSlider = () => <Slider />;

SimpleSlider.story = {
  name: 'SimpleSlider',
};
