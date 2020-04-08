import { DocumentNode } from 'graphql';

import { Feature, FeatureCategory, Tag } from '../api/generated/types.d';
import { Action, AsyncAction } from './';
import HARBOR_QUERY from '../api/queries/harborQuery';
import FERRY_QUERY from '../api/queries/ferryQuery';
import FEATURE_QUERY from '../api/queries/featureQuery';
import graphQLClient from '../api/';
import { Filter } from '../../../alltypes';
import { availableCategories } from '../constants';

export const clearContentState: Action = ({ state }) => {
  state.tagFilters = [];
  state.categoryFilters = [];
  state.selectedFeature = null;
  state.pathname = '/';
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

export const addTagFilter: Action<Filter> = ({ state }, tagFilter) => {
  if (!state.tagFilters.map((filter) => filter.id).includes(tagFilter.id)) {
    state.tagFilters = [...state.tagFilters, tagFilter];
  }
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

export const translateTagFilters: Action<Tag[]> = (
  { state },
  availableTags
) => {
  state.tagFilters = state.tagFilters.map((tagFilter) => {
    const found = availableTags.find(
      (availableTag) => availableTag.id === tagFilter.id
    );
    return found ? found : tagFilter;
  });
};

export const translateCategoryFilters: Action<FeatureCategory[]> = (
  { state },
  availableCategories
) => {
  state.categoryFilters = state.categoryFilters.map((categoryFilter) => {
    const found = availableCategories.find(
      (availableCategory) => availableCategory.id === categoryFilter.id
    );
    return found ? found : categoryFilter;
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

export const selectFeature: Action<Feature> = ({ state }, feature) => {
  state.selectedFeature = { ...feature };
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

export const setPathname: Action<string> = ({ state }, pathname) => {
  state.pathname = pathname;
};

export const selectHarbor: AsyncAction<string> = async ({ state }, ahtiId) => {
  state.selectedFeature = (await fetchFeatureData(HARBOR_QUERY, ahtiId)).harbor;
};

export const selectFerry: AsyncAction<string> = async ({ state }, ahtiId) => {
  state.selectedFeature = (await fetchFeatureData(FERRY_QUERY, ahtiId)).ferry;
};
