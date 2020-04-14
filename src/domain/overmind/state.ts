import { Feature } from '../api/generated/types.d';
import { Filter } from '../../../alltypes';

export type State = {
  // Connected to URL parameters
  queryString: string;
  selectedFeature: Feature | null;
  tagFilters: Filter[];
  categoryFilters: Filter[];
  mapViewToggle: boolean;

  // App internal
  features: Feature[];
  featuresLoading: boolean;
};

export const state: State = {
  queryString: '',
  mapViewToggle: false,
  selectedFeature: null,
  features: [],
  featuresLoading: true,
  tagFilters: [],
  categoryFilters: [],
};
