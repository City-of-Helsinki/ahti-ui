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
      menuItems: [
        {
          categoryIds: ['ahti:category:island'],
          tagIds: [],
          name: 'all_islands'
        }
      ]
    },
    {
      title: 'travel_to_islands',
      category: 'ahti:category:ferry',
      menuItems: [
        {
          categoryIds: [],
          tagIds: [],
          name: 'water_bus_and_ferries',
          disabled: true
        },
        {
          categoryIds: [],
          tagIds: [],
          name: 'boat_rides_and_taxis',
          disabled: true
        },
        {
          categoryIds: [],
          tagIds: [],
          name: 'sightseeing_and_cruises',
          disabled: true
        }
      ]
    },
    {
      title: 'saunas_and_swimming',
      category: 'ahti:category:swimming',
      menuItems: [
        { categoryIds: [], tagIds: ['ahti:category:sauna'], name: 'saunas' },
        {
          categoryIds: [],
          tagIds: ['ahti:tag:swimming'],
          name: 'swimming'
        },
        {
          categoryIds: [],
          tagIds: ['ahti:tag:swimming'],
          name: 'ice_swimming'
        }
      ]
    },
    {
      title: 'restaurants',
      category: 'ahti:category:restaurant',
      menuItems: [
        {
          categoryIds: ['ahti:category:restaurant'],
          tagIds: [],
          name: 'restaurants'
        },
        { categoryIds: ['ahti:category:cafe'], tagIds: [], name: 'cafes' },
        {
          categoryIds: ['ahti:category:bar'],
          tagIds: [],
          name: 'beer_and_wine_bars'
        }
      ]
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
          disabled: true
        }
      ]
    },
    {
      title: 'rental_boats',
      category: 'ahti:category:service',
      menuItems: [
        { categoryIds: [], tagIds: [], name: 'rowboats', disabled: true },
        { categoryIds: [], tagIds: [], name: 'motorboats', disabled: true },
        { categoryIds: [], tagIds: [], name: 'other', disabled: true }
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
