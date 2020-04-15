import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMatomo } from '@datapunt/matomo-tracker-react';
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
  const { trackPageView } = useMatomo();

  useEffect(() => {
    trackPageView({ href: window.location.href });
  }, [window.location.href]);

  const setStateFromURL = () => {
    const parsed = queryString.parse(history.location.search);

    if (parsed.feature) {
      actions.selectFeatureById(parsed.feature as string);
    } else {
      actions.clearSelectedFeature();
    }

    if (parsed.map) {
      actions.setMapViewToggle(parsed.map === 'true');
    }

    if (parsed.tags) {
      actions.setTagFiltersById(
        typeof parsed.tags === 'string' ? [parsed.tags] : parsed.tags
      );
    } else {
      actions.setTagFiltersById([]);
    }

    if (parsed.categories) {
      actions.setCategoryFiltersById(
        typeof parsed.categories === 'string'
          ? [parsed.categories]
          : parsed.categories
      );
    } else {
      actions.setCategoryFiltersById([]);
    }

    actions.setQueryString(history.location.search);
  };

  // Keep state's location in sync with history.
  // For example internal links in the app.
  useEffect(() => {
    if (history.location.search !== state.queryString) {
      setStateFromURL();
    }
  }, [history.location.search]);

  // Push state changes to history.
  useEffect(() => {
    let qs = queryString.stringify({
      feature: state.selectedFeature?.properties.ahtiId,
      tags: state.tagFilters.map((filter) => filter.id),
      categories: state.categoryFilters.map((category) => category.id),
      map: state.mapViewToggle ? state.mapViewToggle : undefined,
    });
    qs = qs !== '' ? '?' + qs : '';

    actions.setQueryString(qs);

    if (history.location.search !== qs) {
      history.push({
        pathname: qs === '' ? history.location.pathname : '/content',
        search: qs,
      });
    }
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
  const { data, loading, refetch } = useFeaturesQuery({
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
