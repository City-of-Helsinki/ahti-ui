import React from 'react';

import Card from './Card';
import ferries from '../../../domain/api/client/staticData/ferries.json';
import island from './__tests__/mockIsland.json';
import harbor from './__tests__/mockHarbor.json';

export default {
  title: 'Card',
  component: Card,
};

export const HarborCard = () => <Card feature={harbor} />;

HarborCard.story = {
  name: 'Harbor',
};

export const FerryCard = () => <Card feature={ferries[0]} />;

FerryCard.story = {
  name: 'Ferry',
};

export const IslandCard = () => <Card feature={island} />;

IslandCard.story = {
  name: 'Island',
};
