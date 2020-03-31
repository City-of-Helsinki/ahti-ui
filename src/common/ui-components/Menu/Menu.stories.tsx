import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Menu, { MenuCategory } from './Menu';

const defaultMenuItems: MenuCategory[] = [
  {
    title: 'islands',
    category: 'ahti:category:island',
    menuItems: [
      {
        categoryIds: ['ahti:category:island'],
        tagIds: [],
        name: 'all_islands',
      },
    ],
  },
  {
    title: 'travel_to_islands',
    category: 'ahti:category:ferry',
    menuItems: [
      {
        categoryIds: [],
        tagIds: [],
        name: 'water_bus_and_ferries',
        disabled: true,
      },
      {
        categoryIds: [],
        tagIds: [],
        name: 'boat_rides_and_taxis',
        disabled: true,
      },
      {
        categoryIds: [],
        tagIds: [],
        name: 'sightseeing_and_cruises',
        disabled: true,
      },
    ],
  },
  {
    title: 'saunas_and_swimming',
    category: 'ahti:category:swimming',
    menuItems: [
      { categoryIds: [], tagIds: ['ahti:category:sauna'], name: 'saunas' },
      {
        categoryIds: [],
        tagIds: ['ahti:category:swimming'],
        name: 'swimming',
      },
      {
        categoryIds: [],
        tagIds: ['ahti:category:swimming'],
        name: 'ice_swimming',
      },
    ],
  },
  {
    title: 'restaurants',
    category: 'ahti:category:restaurant',
    menuItems: [
      {
        categoryIds: ['ahti:category:restaurant'],
        tagIds: [],
        name: 'restaurants',
      },
      { categoryIds: ['ahti:category:cafe'], tagIds: [], name: 'cafes' },
      {
        categoryIds: ['ahti:category:bar'],
        tagIds: [],
        name: 'beer_and_wine_bars',
      },
    ],
  },
  {
    title: 'boater_services',
    category: 'ahti:category:service',
    menuItems: [
      { categoryIds: [], tagIds: [], name: 'mooring', disabled: true },
      { categoryIds: [], tagIds: [], name: 'maintenance', disabled: true },
      {
        categoryIds: [],
        tagIds: [],
        name: 'septic_tank_draining',
        disabled: true,
      },
    ],
  },
  {
    title: 'rental_boats',
    category: 'ahti:category:service',
    menuItems: [
      { categoryIds: [], tagIds: [], name: 'rowboats', disabled: true },
      { categoryIds: [], tagIds: [], name: 'motorboats', disabled: true },
      { categoryIds: [], tagIds: [], name: 'other', disabled: true },
    ],
  },
];

export default {
  title: 'Menu',
  decorators: [
    (storyFn: () => React.ReactNode) => <Router>{storyFn()}</Router>,
  ],
};

export const TranslatedMenuItems = () => {
  return <Menu menuCategories={defaultMenuItems} translate={true} />;
};

TranslatedMenuItems.story = {
  name: 'Translated menu items',
};

export const MenuWithLanguageSelect = () => {
  return <Menu menuCategories={defaultMenuItems} translate={true} />;
};

MenuWithLanguageSelect.story = {
  name: 'Menu with language selection',
};
