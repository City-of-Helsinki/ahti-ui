import React from 'react';
import Card from './Card';
import harbors from '../../../domain/api/client/staticData/harbors.json';
import ferries from '../../../domain/api/client/staticData/ferries.json';
import island from './__tests__/mockIsland.json';

export default {
  title: 'Card',
  component: Card
};

export const HarborCard = () => (
  <Card feature={harbors[0]} selectFeature={() => {}} />
);

HarborCard.story = {
  name: 'Harbor'
};

export const FerryCard = () => (
  <Card feature={ferries[0]} selectFeature={() => {}} />
);

FerryCard.story = {
  name: 'Ferry'
};

export const IslandCard = () => {
  return <Card feature={island} selectFeature={() => {}} />;
};

IslandCard.story = {
  name: 'Island'
};
