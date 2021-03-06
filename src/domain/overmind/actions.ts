import { DocumentNode } from 'graphql';

import { Feature, FeatureCategory, Tag } from '../api/generated/types.d';
import { Action, AsyncAction } from './';
import FERRY_QUERY from '../api/queries/ferryQuery';
import FEATURE_QUERY from '../api/queries/featureQuery';
import graphQLClient from '../api/';
import { Filter } from '../../../alltypes';

export const clearContentState: Action = ({ state }) => {
  state.tagFilters = [];
  state.categoryFilters = [];
  state.selectedFeature = null;
  state.mapViewToggle = false;
};

export const addCategoryFilter: Action<Filter> = (
  { state },
  categoryFilter
) => {
  if (
    !state.categoryFilters
      .map((filter) => filter.id)
      .includes(categoryFilter.id)
  ) {
    state.categoryFilters = [...state.categoryFilters, categoryFilter];
  }
};

export const setCategoryFilters: Action<Filter[]> = ({ state }, filters) => {
  state.categoryFilters = filters;
};

export const addTagFilter: Action<Filter> = ({ state }, tagFilter) => {
  if (!state.tagFilters.map((filter) => filter.id).includes(tagFilter.id)) {
    state.tagFilters = [...state.tagFilters, tagFilter];
  }
};

export const setTagFilters: Action<Filter[]> = ({ state }, filters) => {
  state.tagFilters = filters;
};

export const setTagFiltersById: Action<string[]> = (
  { state },
  tagFilterIds
) => {
  state.tagFilters = tagFilterIds.map((filterId) => {
    return {
      id: filterId,
    };
  });
};

export const setCategoryFiltersById: Action<string[]> = (
  { state },
  categoryFilterIds
) => {
  state.categoryFilters = categoryFilterIds.map((categoryId) => {
    return {
      id: categoryId,
    };
  });
};

export const removeFilter: Action<string> = ({ state }, filterId) => {
  if (filterId.startsWith('ahti:category')) {
    state.categoryFilters = state.categoryFilters.filter(
      (categoryFilter) => categoryFilter.id !== filterId
    );
  } else if (filterId.startsWith('ahti:tag')) {
    state.tagFilters = state.tagFilters.filter(
      (tagFilter) => tagFilter.id !== filterId
    );
  } else {
    // Filter could be of some other type, need to test both.
    state.categoryFilters = state.categoryFilters.filter(
      (categoryFilter) => categoryFilter.id !== filterId
    );
    state.tagFilters = state.tagFilters.filter(
      (tagFilter) => tagFilter.id !== filterId
    );
  }
};

export const toggleMapView: Action = ({ state }) => {
  state.mapViewToggle = !state.mapViewToggle;
};

export const setMapViewToggle: Action<boolean> = ({ state }, mapViewToggle) => {
  state.mapViewToggle = mapViewToggle;
};

export const setFeatures: Action<Feature[]> = ({ state }, features) => {
  state.features = features;
};

export const setFeaturesLoading: Action<boolean> = (
  { state },
  featuresLoading
) => {
  state.featuresLoading = featuresLoading;
};

const fetchFeatureData = async (query: DocumentNode, ahtiId: string) => {
  const { data } = await graphQLClient.query({
    fetchPolicy: 'network-only',
    query: query,
    variables: { ahtiId: ahtiId },
  });
  return data;
};

export const clearSelectedFeature: Action = ({ state }) => {
  state.selectedFeature = null;
};

export const selectFeatureById: AsyncAction<string> = async (
  { state },
  ahtiId
) => {
  state.selectedFeature = (
    await fetchFeatureData(FEATURE_QUERY, ahtiId)
  ).feature;
};

export const setQueryString: Action<string> = ({ state }, queryString) => {
  state.queryString = queryString;
};

export const selectFerry: AsyncAction<string> = async ({ state }, ahtiId) => {
  state.selectedFeature = (await fetchFeatureData(FERRY_QUERY, ahtiId)).ferry;
};
