import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as queryString from 'query-string';

import { useOvermind } from '../overmind';

export const useUrlState = () => {
  const { state, actions } = useOvermind();
  const history = useHistory();

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
      history.push({ search: qs });
    }
  }, [
    state.selectedFeature,
    state.categoryFilters,
    state.tagFilters,
    state.mapViewToggle,
  ]);
};
