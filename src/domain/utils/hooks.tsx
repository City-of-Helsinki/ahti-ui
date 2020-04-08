import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as queryString from 'query-string';

import { useOvermind } from '../overmind';
import {
  useCategoriesQuery,
  useFeaturesQuery,
  useTagsQuery,
} from '../api/generated/types.d';
import {
  featuresLens,
  tagsLens,
  categoriesLens,
} from '../../common/utils/lenses';

export const useUrlState = () => {
  const { state, actions } = useOvermind();
  const history = useHistory();

  // Keep state's pathname in sync with history.
  // For example internal links in the app.
  useEffect(() => {
    actions.setPathname(history.location.pathname);
  }, [history.location.pathname]);

  // Push state changes to url.
  useEffect(() => {
    const queryStr = queryString.stringify({
      feature: state.selectedFeature?.properties.ahtiId,
      tags: state.tagFilters.map((filter) => filter.id),
      categories: state.categoryFilters.map((category) => category.id),
      map: state.mapViewToggle,
    });
    history.push({ pathname: state.pathname, search: queryStr });
  }, [
    state.selectedFeature,
    state.categoryFilters,
    state.tagFilters,
    state.mapViewToggle,
  ]);
};

export const useFeatures = () => {
  const { i18n } = useTranslation();
  const { state, actions } = useOvermind();
  const [cursor, setCursor] = useState<string>('');
  const { data, loading } = useFeaturesQuery({
    variables: {
      first: 50,
      after: cursor,
      category: state.categoryFilters.map((filter) => filter.id),
      tag: state.tagFilters.map((filter) => filter.id),
    },
  });

  useEffect(() => {
    actions.setFeatures([]);
    setCursor('');
  }, [state.tagFilters, state.categoryFilters]);

  useEffect(() => {
    console.log(i18n.language);
    actions.setFeatures([]);
    setCursor('');
    if (state.selectedFeature) {
      actions.selectFeatureById(state.selectedFeature.properties.ahtiId);
    }
  }, [i18n.language]);

  useEffect(() => {
    // Only set as loading when no features have been fetched and the query hook's state is loading,
    // as the "streaming" of data will cause the loading state to be true.
    actions.setFeaturesLoading(loading && state.features.length === 0);
  }, [loading]);

  // Paginates the request until no more pages are left.
  useEffect(() => {
    if (data) {
      actions.setFeatures([...state.features, ...featuresLens.get(data)]);
      if (data.features.pageInfo.hasNextPage) {
        setCursor(data.features.pageInfo.endCursor);
      }
    }
  }, [data]);
};

export const useTags = () => {
  const { i18n } = useTranslation();
  const { actions } = useOvermind();
  const { data, refetch } = useTagsQuery();

  useEffect(() => {
    const fetchedTags = tagsLens.get(data);
    actions.translateTagFilters(fetchedTags);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [i18n.language]);
};

export const useCategories = () => {
  const { i18n } = useTranslation();
  const { actions } = useOvermind();
  const { data, refetch } = useCategoriesQuery();

  useEffect(() => {
    const fetchedCategories = categoriesLens.get(data);
    actions.translateCategoryFilters(fetchedCategories);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [i18n.language]);
};
