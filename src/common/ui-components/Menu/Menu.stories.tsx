import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Menu from './Menu';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { SUPPORTED_LANGUAGES } from '../../translation/TranslationConstants';

const defaultMenuItems = [
  {
    title: 'islands',
    category: 'ahti:category:island',
    menuItems: [{ id: '', name: 'all_islands', url: '/map?type=myhelsinki' }]
  },
  {
    title: 'travel_to_islands',
    category: 'ahti:category:island',
    menuItems: [
      { id: '', name: 'water_bus_and_ferries', url: '/', disabled: true },
      { id: '', name: 'boat_rides_and_taxis', url: '/', disabled: true },
      { id: '', name: 'sightseeing_and_cruises', url: '/', disabled: true }
    ]
  },
  {
    title: 'saunas_and_swimming',
    category: 'ahti:category:island',
    menuItems: [
      { id: '', name: 'saunas', url: '/', disabled: true },
      { id: '', name: 'swimming', url: '/', disabled: true },
      { id: '', name: 'ice_swimming', url: '/', disabled: true }
    ]
  },
  {
    title: 'restaurants',
    category: 'ahti:category:island',
    menuItems: [
      { id: '', name: 'restaurants', url: '/', disabled: true },
      { id: '', name: 'cafes', url: '/', disabled: true },
      { id: '', name: 'beer_and_wine_bars', url: '/', disabled: true }
    ]
  },
  {
    title: 'boater_services',
    category: 'ahti:category:island',
    menuItems: [
      { id: '', name: 'mooring', url: '/', disabled: true },
      { id: '', name: 'maintenance', url: '/', disabled: true },
      { id: '', name: 'septic_tank_draining', url: '/', disabled: true }
    ]
  },
  {
    title: 'rental_boats',
    category: 'ahti:category:island',
    menuItems: [
      { id: '', name: 'rowboats', url: '/', disabled: true },
      { id: '', name: 'motorboats', url: '/', disabled: true },
      { id: '', name: 'other', url: '/', disabled: true }
    ]
  }
];

export default {
  title: 'Menu',
  decorators: [(storyFn: () => React.ReactNode) => <Router>{storyFn()}</Router>]
};

export const TranslatedMenuItems = () => {
  return <Menu menuCategories={defaultMenuItems} translate={true} />;
};

TranslatedMenuItems.story = {
  name: 'Translated menu items'
};

export const MenuWithLanguageSelect = () => {
  return (
    <Menu
      menuCategories={defaultMenuItems}
      translate={true}
      openComponent={
        <LanguageSelect
          supportedLanguages={Object.values(SUPPORTED_LANGUAGES)}
        />
      }
    />
  );
};

MenuWithLanguageSelect.story = {
  name: 'Menu with language selection'
};
