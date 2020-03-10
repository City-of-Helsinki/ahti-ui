import React, { useEffect } from 'react';
import { IconCheck, IconClose } from 'hds-react';

import styles from './ContentPage.module.scss';
import Breadcrumb from '../../common/ui-components/Breadcrumb/Breadcrumb';
import Toggle from '../../common/ui-components/Toggle/Toggle';
import ListView from '../../common/ui-components/ListView/ListView';
import Map from '../../common/ui-components/Map/Map';
import BackButton from '../../common/ui-components/BackButton/BackButton';
import Card from '../../common/ui-components/Card/Card';
import { useOvermind } from '../overmind';
import { useScrollToTop } from '../../common/utils/hooks';

const ContentPage: React.FC = () => {
  const { state, actions } = useOvermind();
  useScrollToTop();

  return (
    <>
      <div className={styles.subHeading}>
        <Breadcrumb
          items={[...state.categoryFilters, ...state.tagFilters]}
          onClose={ahtiId => actions.removeFilter(ahtiId)}
        />
        <Toggle
          onIcon={<IconCheck />}
          offIcon={<IconClose />}
          toggleState={state.mapViewToggle}
          onToggle={() => actions.toggleMapView()}
        />
      </div>
      <div className={styles.content}>
        {!state.selectedFeature && !state.mapViewToggle && (
          <ListView
            features={state.features}
            onClick={feature => actions.selectFeature(feature)}
          />
        )}
        {state.mapViewToggle && (
          <Map
            className={styles.map}
            features={state.features}
            onClick={actions.selectFeature}
          />
        )}
        {state.selectedFeature && (
          <>
            <BackButton onBack={() => actions.clearSelectedFeature()} />
            <Card feature={state.selectedFeature} />
          </>
        )}
      </div>
    </>
  );
};

export default ContentPage;
