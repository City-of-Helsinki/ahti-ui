import { Feature } from '../api/generated/types.d';
import { MenuCategory } from '../../common/ui-components/Menu/Menu';

export type Filter = {
  readonly id: string;
  readonly name: string;
};

export type Category = {
  readonly category: string;
};

export type CategoryFilter = Filter & Category;

export type State = {
  selectedFeature: Feature | null;
  features: Feature[];
  tagFilters: Filter[];
  categoryFilters: CategoryFilter[];
  menuCategories: MenuCategory[];
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
      menuItems: [{ name: 'all_islands', id: 'ahti:category:island' }]
    }
  ]
};
