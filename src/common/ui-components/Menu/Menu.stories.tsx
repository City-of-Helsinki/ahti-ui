import React from 'react';
import Menu from './Menu';
import { IconLocation, IconFood } from 'hds-react';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { SUPPORTED_LANGUAGES } from '../../translation/TranslationConstants';
import { BrowserRouter as Router } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const defaultMenuItems = [
  {
    title: 'islands',
    icon: <IconLocation />,
    links: [{ name: 'all_islands', url: '/map?type=myhelsinki' }]
  },
  {
    title: 'travel_to_islands',
    icon: <IconLocation />,
    links: [
      { name: 'water_bus_and_ferries', url: '/', disabled: true },
      { name: 'boat_rides_and_taxis', url: '/', disabled: true },
      { name: 'sightseeing_and_cruises', url: '/', disabled: true }
    ]
  },
  {
    title: 'saunas_and_swimming',
    icon: <IconLocation />,
    links: [
      { name: 'saunas', url: '/', disabled: true },
      { name: 'swimming', url: '/', disabled: true },
      { name: 'ice_swimming', url: '/', disabled: true }
    ]
  },
  {
    title: 'restaurants',
    icon: <IconFood />,
    links: [
      { name: 'restaurants', url: '/', disabled: true },
      { name: 'cafes', url: '/', disabled: true },
      { name: 'beer_and_wine_bars', url: '/', disabled: true }
    ]
  },
  {
    title: 'boater_services',
    icon: <IconLocation />,
    links: [
      { name: 'mooring', url: '/', disabled: true },
      { name: 'maintenance', url: '/', disabled: true },
      { name: 'septic_tank_draining', url: '/', disabled: true }
    ]
  },
  {
    title: 'rental_boats',
    icon: <IconLocation />,
    links: [
      { name: 'rowboats', url: '/', disabled: true },
      { name: 'motorboats', url: '/', disabled: true },
      { name: 'other', url: '/', disabled: true }
    ]
  }
];

export default {
  title: 'Menu',
  decorators: [(storyFn: () => React.ReactNode) => <Router>{storyFn()}</Router>]
};

export const TranslatedMenuItems = () => {
  return <Menu menuItems={defaultMenuItems} translate={true} />;
};

TranslatedMenuItems.story = {
  name: 'Translated menu items'
};

export const MenuWithLanguageSelect = () => {
  return (
    <Menu menuItems={defaultMenuItems} translate={true}>
      <LanguageSelect supportedLanguages={Object.values(SUPPORTED_LANGUAGES)} />
    </Menu>
  );
};

MenuWithLanguageSelect.story = {
  name: 'Menu with language selection'
};
