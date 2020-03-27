import * as queryString from 'query-string';

import { OnInitialize } from './index';

export const onInitialize: OnInitialize = ({ actions }) => {
  /*
   * Initialize state from url.
   *
   * After initialization the single source of truth for the query parameters
   * is the applications state. This enables linking directly to content.
   */

  if (!window) {
    return;
  }

  actions.setPathname(window.location.pathname);

  const parsed = queryString.parse(window.location.search);

  parsed.feature && actions.selectFeatureById(parsed.feature as string);
  parsed.map && actions.setMapViewToggle(parsed.map === 'true');
  parsed.tags &&
    actions.setTagFiltersById(
      typeof parsed.tags === 'string' ? [parsed.tags] : parsed.tags
    );
  parsed.categories &&
    actions.setCategoryFiltersById(
      typeof parsed.categories === 'string'
        ? [parsed.categories]
        : parsed.categories
    );
};
