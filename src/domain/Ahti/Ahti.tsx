import React from 'react';
import { IconClose, IconCheck } from 'hds-react';

import Menu, { MenuItem } from '../../common/ui-components/Menu/Menu';
import LanguageSelect from '../../common/ui-components/LanguageSelect/LanguageSelect';
import { SUPPORTED_LANGUAGES } from '../../common/translation/TranslationConstants';
import Breadcrumb from '../../common/ui-components/Breadcrumb/Breadcrumb';
import ListView from '../../common/ui-components/ListView/ListView';
import { useOvermind } from '../overmind';
import styles from './Ahti.module.scss';
import Card from '../../common/ui-components/Card/Card';
import BackButton from '../../common/ui-components/BackButton/BackButton';
import Search from '../../common/ui-components/Search/Search';
import Toggle from '../../common/ui-components/Toggle/Toggle';
import Map from '../../common/ui-components/Map/Map';

const Ahti: React.FC = () => {
  const { state, actions } = useOvermind();

  return (
    <div className={styles.ahti}>
      <Menu
        className={styles.menu}
        menuCategories={state.menuCategories}
        translate={true}
        onSelect={(menuItem: MenuItem) => {
          actions.addCategoryFilter({
            category: menuItem.id,
            id: menuItem.id,
            name: menuItem.name
          });
        }}
        closedComponent={
          <Search
            featuresToSearch={state.features}
            onSelect={ahtiId => actions.selectFeatureById(ahtiId)}
            className={styles.search}
            resultsClassName={styles.searchResults}
          />
        }
        openComponent={
          <LanguageSelect
            supportedLanguages={Object.values(SUPPORTED_LANGUAGES)}
          />
        }
      />
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
            className={styles.menu}
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
    </div>
  );
};

export default Ahti;
