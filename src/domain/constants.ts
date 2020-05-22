import { MenuCategory } from '../common/ui-components/Menu/Menu';
import { ContentSliderItem } from '../common/ui-components/Slider/ContentSlider/ContentSlider';

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
        categoryIds: ['ahti:category:water_bus', 'ahti:category:ferry'],
        tagIds: [],
        name: 'water_bus_and_ferries',
      },
      {
        categoryIds: ['ahti:category:water_taxi', 'ahti:category:boat_ride'],
        tagIds: [],
        name: 'boat_rides_and_taxis',
      },
      {
        categoryIds: ['ahti:category:sightseeing', 'ahti:category:cruise'],
        tagIds: [],
        name: 'sightseeing_and_cruises',
      },
    ],
  },
  {
    title: 'saunas_and_swimming',
    category: 'ahti:category:sauna',
    menuItems: [
      { categoryIds: ['ahti:category:sauna'], tagIds: [], name: 'saunas' },
      {
        categoryIds: [],
        tagIds: ['ahti:tag:swimming'],
        name: 'swimming',
      },
      {
        categoryIds: [],
        tagIds: ['ahti:tag:ice_swimming'],
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
      {
        categoryIds: ['ahti:category:harbor'],
        tagIds: [],
        name: 'harbor',
      },
      {
        categoryIds: ['ahti:category:harbor'],
        tagIds: [
          'ahti:tag:guest_harbor',
          'ahti:tag:city_guest_harbor',
          'ahti:tag:private_guest_harbor',
        ],
        name: 'guest_harbor',
      },
      {
        categoryIds: ['ahti:category:service_station'],
        tagIds: [],
        name: 'service_station',
      },
      {
        categoryIds: ['ahti:category:boat_maintenance'],
        tagIds: [],
        name: 'maintenance',
      },
      {
        categoryIds: [],
        tagIds: ['ahti:tag:septic_tank_draining'],
        name: 'septic_tank_draining',
      },
      {
        categoryIds: [],
        tagIds: ['ahti:tag:gas_station'],
        name: 'gas_station',
      },
      {
        categoryIds: [],
        tagIds: ['ahti:tag:slipway'],
        name: 'slipway',
      },
      {
        categoryIds: [],
        tagIds: ['ahti:tag:boat_lift'],
        name: 'boat_lift',
      },
    ],
  },
  {
    title: 'rental_services',
    category: 'ahti:category:rental_service',
    menuItems: [
      { categoryIds: [], tagIds: ['ahti:tag:sup'], name: 'sup' },
      { categoryIds: [], tagIds: ['ahti:tag:kayak'], name: 'kayak' },
      { categoryIds: [], tagIds: ['ahti:tag:canoeing'], name: 'kayak' },
      { categoryIds: [], tagIds: ['ahti:tag:rowing_boat'], name: 'rowing' },
      {
        categoryIds: [],
        tagIds: ['ahti:tag:rental_boat'],
        name: 'rental_boat',
      },
      { categoryIds: [], tagIds: ['ahti:tag:city_boat'], name: 'city_boat' },
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

export const seasideExperiencesSliderContent: ContentSliderItem[] = [
  {
    categoryFilters: [{ id: 'ahti:category:sightseeing' }],
    tagFilters: [],
    title: 'seaside_experiences.sightseeing',
    imageUrl: '/images/placeholder.png',
  },
  {
    categoryFilters: [],
    tagFilters: [{ id: 'ahti:tag:sup' }],
    title: 'seaside_experiences.sup',
    imageUrl: '/images/placeholder.png',
  },
  {
    categoryFilters: [],
    tagFilters: [{ id: 'ahti:tag:kayak' }],
    title: 'seaside_experiences.kayak',
    imageUrl: '/images/placeholder.png',
  },
  {
    categoryFilters: [],
    tagFilters: [{ id: 'ahti:tag:canoeing' }],
    title: 'seaside_experiences.canoeing',
    imageUrl: '/images/placeholder.png',
  },
  {
    categoryFilters: [],
    tagFilters: [{ id: 'ahti:tag:rowing_boat' }],
    title: 'seaside_experiences.rowing_boat',
    imageUrl: '/images/placeholder.png',
  },
  {
    categoryFilters: [],
    tagFilters: [{ id: 'ahti:tag:city_boat' }],
    title: 'seaside_experiences.city_boat',
    imageUrl: '/images/placeholder.png',
  },
  {
    categoryFilters: [],
    tagFilters: [{ id: 'ahti:tag:rental_boat' }],
    title: 'seaside_experiences.rental_boat',
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
  RENTAL_SERVICE: 'ahti:category:rental_service',
  SERVICE_STATION: 'ahti:category:service_station',
  BOAT_MAINTENANCE: 'ahti:category:boat_maintenance',
};
