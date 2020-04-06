import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFeaturesQuery } from '../api/generated/types.d';
import { useOvermind } from '../overmind';
import { featuresLens } from '../../common/utils/lenses';

const Features: React.FC = () => {
  const [cursor, setCursor] = useState<string>('');
  const { i18n } = useTranslation();
  const { state, actions } = useOvermind();
  const { data, loading } = useFeaturesQuery({
    fetchPolicy: 'network-only',
    variables: {
      after: cursor,
      first: 50,
      category: state.categoryFilters.map((filter) => filter.id),
      tag: state.tagFilters.map((filter) => filter.id),
    },
  });

  useEffect(() => {
    // Only set as loading when no features have been fetched and the query hook's state is loading,
    // as the "streaming" of data will cause the loading state to be true.
    actions.setFeaturesLoading(loading && state.features.length === 0);
  }, [loading]);

  useEffect(() => {
    actions.setFeatures([]);
    setCursor('');
  }, [state.tagFilters, state.categoryFilters]);

  useEffect(() => {
    console.log(data);
    if (data) {
      actions.setFeatures([...state.features, ...featuresLens.get(data)]);
      if (data?.features?.pageInfo.hasNextPage) {
        setCursor(data?.features?.pageInfo.endCursor || '');
      }
    }
  }, [data]);

  useEffect(() => {
    actions.setFeatures([]);
    setCursor('');
    if (state.selectedFeature) {
      actions.selectFeatureById(state.selectedFeature.properties.ahtiId);
    }
  }, [i18n.language]);

  return null;
};

export default Features;
