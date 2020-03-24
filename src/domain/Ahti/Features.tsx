import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFeaturesQuery } from '../api/generated/types.d';
import { useOvermind } from '../overmind';
import { featuresLens } from '../../common/utils/lenses';

const Features: React.FC = () => {
  const [cursor, setCursor] = useState<string>('');
  const { i18n } = useTranslation();
  const { state, actions } = useOvermind();
  const { data, refetch } = useFeaturesQuery({
    variables: {
      after: cursor,
      first: 50,
      category: state.categoryFilters.map((filter) => filter.id),
      tag: state.tagFilters.map((filter) => filter.id),
    },
  });

  useEffect(() => {
    actions.setFeatures([]);
    setCursor('');
  }, [state.tagFilters, state.categoryFilters, actions]);

  useEffect(() => {
    if (data) {
      actions.setFeatures([...state.features, ...featuresLens.get(data)]);
      if (data?.features?.pageInfo.hasNextPage) {
        setCursor(data?.features?.pageInfo.endCursor || '');
      }
    }
  }, [actions, data, state.features]);

  useEffect(() => {
    actions.setFeatures([]);
    setCursor('');
    refetch();
  }, [actions, i18n.language, refetch]);

  return null;
};

export default Features;
