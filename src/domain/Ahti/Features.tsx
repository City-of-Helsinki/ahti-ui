import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useFeaturesQuery } from '../api/generated/types.d';
import { useOvermind } from '../overmind';
import { featuresLens } from '../../common/utils/lenses';

const Features: React.FC = () => {
  const { i18n } = useTranslation();
  const { state, actions } = useOvermind();
  const { data, refetch } = useFeaturesQuery({
    variables: {
      first: 100,
      category: state.categoryFilters.map(filter => filter.id),
      tag: state.tagFilters.map(filter => filter.id)
    }
  });

  useEffect(() => {
    if (data) {
      actions.setFeatures(featuresLens.get(data));
    }
  }, [actions, data]);

  useEffect(() => {
    refetch();
  }, [i18n.language, refetch]);

  return null;
};

export default Features;
