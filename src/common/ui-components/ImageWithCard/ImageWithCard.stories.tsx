import React from 'react';

import ImageWithCard from './ImageWithCard';

export default {
  title: 'ImageWithCard',
  component: ImageWithCard,
};

export const IndexPageExample = () => {
  return (
    <ImageWithCard
      src="https://scstylecaster.files.wordpress.com/2018/01/beyonce.jpg"
      className=""
    >
      <h1>Hello, this is a demo </h1>
    </ImageWithCard>
  );
};
