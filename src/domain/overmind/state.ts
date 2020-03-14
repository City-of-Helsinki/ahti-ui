import { Feature } from '../api/generated/types.d';
import { MenuCategory } from '../../common/ui-components/Menu/Menu';
import { Filter } from '../../../alltypes';

export type State = {
  selectedFeature: Feature | null;
  features: Feature[];
  tagFilters: Filter[];
  categoryFilters: Filter[];
  menuCategories: MenuCategory[];
  availableCategories: string[];
  mapViewToggle: boolean;
};

export const state: State = {
  mapViewToggle: false,
  selectedFeature: null,
  features: [],
  tagFilters: [],
  categoryFilters: [],
  menuCategories: [
    {
      title: 'islands',
      category: 'ahti:category:island',
      menuItems: [{ id: 'ahti:category:island', name: 'all_islands' }]
    },
    {
      title: 'travel_to_islands',
      category: 'ahti:category:ferry',
      menuItems: [
        { id: '', name: 'water_bus_and_ferries', disabled: true },
        { id: '', name: 'boat_rides_and_taxis', disabled: true },
        { id: '', name: 'sightseeing_and_cruises', disabled: true }
      ]
    },
    {
      title: 'saunas_and_swimming',
      category: 'ahti:category:swimming',
      menuItems: [
        { id: 'ahti:category:sauna', name: 'saunas' },
        { id: 'ahti:category:swimming', name: 'swimming' },
        { id: 'ahti:category:swimming', name: 'ice_swimming' }
      ]
    },
    {
      title: 'restaurants',
      category: 'ahti:category:restaurant',
      menuItems: [
        { id: 'ahti:category:restaurant', name: 'restaurants' },
        { id: 'ahti:category:cafe', name: 'cafes' },
        { id: 'ahti:category:bar', name: 'beer_and_wine_bars' }
      ]
    },
    {
      title: 'boater_services',
      category: 'ahti:category:service',
      menuItems: [
        { id: '', name: 'mooring', disabled: true },
        { id: '', name: 'maintenance', disabled: true },
        { id: '', name: 'septic_tank_draining', disabled: true }
      ]
    },
    {
      title: 'rental_boats',
      category: 'ahti:category:service',
      menuItems: [
        { id: '', name: 'rowboats', disabled: true },
        { id: '', name: 'motorboats', disabled: true },
        { id: '', name: 'other', disabled: true }
      ]
    }
  ],
  availableCategories: [
    'ahti:category:island',
    'ahti:category:restaurant',
    'ahti:category:sightseeing',
    'ahti:category:sauna',
    'ahti:category:cafe'
  ]
};
