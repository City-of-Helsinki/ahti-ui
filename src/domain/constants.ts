import { MenuCategory } from '../common/ui-components/Menu/Menu';
import { ContentSliderItem } from '../common/ui-components/Slider/ContentSlider/ContentSlider';
import { Filter } from '../../alltypes';

// Map defaults
export const initialLatitude = 60.13;
export const initialLongitude = 24.984;
export const initialZoomLevel = 10;
export const selectedFeatureZoomLevel = 13;
export const minZoomLevel = 8;
export const maxZoomLevel = 18;
export const clusteringRadius = 75;
export const transitionDuration = 700;

// Static content
export const menuCategories: MenuCategory[] = [
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
        categoryIds: ['ahti:category:ferry'],
        tagIds: [],
        name: 'water_bus_and_ferries',
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
        tagIds: ['ahti:tag:swimming'],
        name: 'swimming',
      },
      {
        categoryIds: [],
        tagIds: ['ahti:tag:swimming'],
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

export const boaterServicesSliderContent: ContentSliderItem[] = [
  {
    categoryFilters: [{ id: 'ahti:category:harbor' }],
    tagFilters: [],
    title: 'boater_services.guest_harbors',
    imageUrl: '/images/placeholder.png',
  },
  {
    categoryFilters: [
      { id: 'ahti:category:restaurant' },
      { id: 'ahti:category:cafe' },
      { id: 'ahti:category:bar' },
    ],
    tagFilters: [],
    title: 'boater_services.restaurants',
    imageUrl: '/images/placeholder.png',
  },
  {
    categoryFilters: [],
    tagFilters: [],
    title: 'boater_services.rental_boats',
    imageUrl: '/images/placeholder.png',
  },
];

export const categories: Record<string, string> = {
  ISLAND: 'ahti:category:island',
  RESTAURANT: 'ahti:category:restaurant',
  SIGHTSEEING: 'ahti:category:sightseeing',
  SAUNA: 'ahti:category:sauna',
  CAFE: 'ahti:category:cafe',
  HARBOR: 'ahti:category:harbor',
  FERRY: 'ahti:category:ferry',
};
