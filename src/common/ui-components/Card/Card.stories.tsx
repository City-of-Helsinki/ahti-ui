import React from 'react';

import Card from './Card';
import harbors from '../../../domain/api/client/staticData/harbors.json';
import ferries from '../../../domain/api/client/staticData/ferries.json';
import island from './__tests__/mockIsland.json';

export default {
  title: 'Card',
  component: Card
};

export const HarborCard = () => <Card feature={harbors[0]} />;

HarborCard.story = {
  name: 'Harbor'
};

export const FerryCard = () => <Card feature={ferries[0]} />;

FerryCard.story = {
  name: 'Ferry'
};

export const IslandCard = () => <Card feature={island} />;

IslandCard.story = {
  name: 'Island'
};
