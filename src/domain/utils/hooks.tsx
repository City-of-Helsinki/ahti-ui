import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import * as queryString from 'query-string';

import { useOvermind } from '../overmind';
import {
  FeaturesQuery,
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

type FeaturesQueryVariables = {
  readonly categories: string[];
  readonly tags: string[];
};

export const useFeatures = () => {
  const { i18n } = useTranslation();
  const { state, actions } = useOvermind();
  const [pageInfo, setPageInfo] = useState(null);
  const [queryVariables, setQueryVariables] = useState<FeaturesQueryVariables>({
    categories: [],
    tags: [],
  });
  const { data, networkStatus, refetch, client, fetchMore } = useFeaturesQuery({
    variables: {
      first: 25,
      category: queryVariables.categories,
      tag: queryVariables.tags,
    },
  });

  useEffect(() => {
    setQueryVariables({
      tags: state.tagFilters.map((filter) => filter.id),
      categories: state.categoryFilters.map((filter) => filter.id),
    });
    refetch();
  }, [state.tagFilters, state.categoryFilters]);

  useEffect(() => {
    client.cache.reset();
    if (state.selectedFeature) {
      actions.selectFeatureById(state.selectedFeature.properties.ahtiId);
    }
    refetch();
  }, [i18n.language]);
  useEffect(() => {
    // Inspect network status enum:
    // https://github.com/apollographql/apollo-client/blob/master/src/core/networkStatus.ts
    const isLoading = networkStatus ? networkStatus < 7 : false;
    actions.setFeaturesLoading(isLoading);

    if (!isLoading && pageInfo && pageInfo.hasNextPage) {
      fetchMore({
        variables: { after: pageInfo.endCursor },
        updateQuery: (prev: FeaturesQuery, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (!prev) return fetchMoreResult;
          return Object.assign({}, prev, {
            features: {
              edges: [
                ...prev.features.edges,
                ...fetchMoreResult.features.edges,
              ],
              pageInfo: fetchMoreResult.features.pageInfo,
              __typename: fetchMoreResult.features.__typename,
            },
          });
        },
      });
    }
  }, [networkStatus, pageInfo]);

  useEffect(() => {
    if (data) {
      actions.setFeatures([...featuresLens.get(data)]);
      setPageInfo(data.features.pageInfo);
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
