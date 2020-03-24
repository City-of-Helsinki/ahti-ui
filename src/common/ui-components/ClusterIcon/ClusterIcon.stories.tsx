import React from 'react';

import ClusterIcon from './ClusterIcon';

export default {
  title: 'ClusterIcon',
  component: ClusterIcon,
};

export const ClusterIconSmallValue = () => <ClusterIcon pointCount={'1'} />;
export const ClusterIconStoryBiggerValue = () => (
  <ClusterIcon pointCount={'89'} />
);

ClusterIconSmallValue.story = {
  name: 'ClusterIconSmallValue',
};

ClusterIconStoryBiggerValue.story = {
  name: 'ClusterIconStoryBiggerValue',
};
