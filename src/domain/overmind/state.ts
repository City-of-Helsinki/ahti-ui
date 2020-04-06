import { Feature } from '../api/generated/types.d';
import { Filter } from '../../../alltypes';

export type State = {
  // Connected to URL parameters
  selectedFeature: Feature | null;
  tagFilters: Filter[];
  categoryFilters: Filter[];
  mapViewToggle: boolean;
  pathname: string;

  // App internal
  features: Feature[];
  featuresLoading: boolean;
};

export const state: State = {
  mapViewToggle: false,
  selectedFeature: null,
  features: [],
  featuresLoading: true,
  tagFilters: [],
  categoryFilters: [],
  pathname: '/',
};
