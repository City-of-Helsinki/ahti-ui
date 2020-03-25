import React from 'react';

import HeroBanner from './HeroBanner';

export default {
  title: 'HeroBanner',
  component: HeroBanner
};

export const HeroBannerExample = () => {
  return (
    <HeroBanner src="https://scstylecaster.files.wordpress.com/2018/01/beyonce.jpg">
      <h1>Hello, this is a demo </h1>
    </HeroBanner>
  );
};
