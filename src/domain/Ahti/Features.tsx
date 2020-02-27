import React, { useEffect } from 'react';

import { useFeaturesQuery } from '../api/generated/types.d';
import { useOvermind } from '../overmind';
import { featuresLens } from '../../common/utils/lenses';

const Features: React.FC = () => {
  const { state, actions } = useOvermind();
  const { data } = useFeaturesQuery({
    variables: {
      first: 100,
      category: state.categoryFilters.map(filter => filter.id)
    }
  });

  useEffect(() => {
    if (data) {
      actions.setFeatures(featuresLens.get(data));
    }
  }, [actions, data]);

  return null;
};

export default Features;
