import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import Menu, { MenuItem } from '../../common/ui-components/Menu/Menu';
import LanguageSelect from '../../common/ui-components/LanguageSelect/LanguageSelect';
import { SUPPORTED_LANGUAGES } from '../../common/translation/TranslationConstants';
import { useOvermind } from '../overmind';
import styles from './Ahti.module.scss';
import Search from '../../common/ui-components/Search/Search';
// import Footer from '../Footer/Footer';
// import ContentPage from '../ContentPage/ContentPage';
// import IndexPage from '../IndexPage/IndexPage';

const Ahti: React.FC = () => {
  const { state, actions } = useOvermind();
  const history = useHistory();

  return (
    <div className={styles.ahti}>
      <Menu
        className={styles.menu}
        menuCategories={state.menuCategories}
        translate={true}
        onSelect={(menuItem: MenuItem) => {
          menuItem.categoryIds.forEach((categoryId) => {
            actions.addCategoryFilter({ id: categoryId });
          });
          menuItem.tagIds.forEach((tagId) => {
            actions.addTagFilter({ id: tagId });
          });
          history.push('/content');
        }}
        onLogoClick={() => actions.clearContentState()}
        closedComponent={
          <Search
            featuresToSearch={state.features}
            onSelect={(ahtiId) => {
              actions.selectFeatureById(ahtiId);
              history.push('/content');
            }}
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
        {/* <Breadcrumb
          items={[...state.categoryFilters, ...state.tagFilters]}
          onClose={(ahtiId) => actions.removeFilter(ahtiId)}
        />
        <Toggle
          onIcon={<IconCheck />}
          offIcon={<IconClose />}
          toggleState={state.mapViewToggle}
          onToggle={() => actions.toggleMapView()}
        /> */}
      </div>
      <div className={styles.content}>
        {!state.selectedFeature && !state.mapViewToggle && (
          // <ListView
          //   features={state.features}
          //   onClick={(feature) => actions.selectFeature(feature)}
          // />
        )}
        {state.mapViewToggle && (
          // <Map
          //   className={styles.map}
          //   features={state.features}
          //   onClick={actions.selectFeature}
          // />
        )}
        {state.selectedFeature && (
          <React.Fragment>
            <BackButton onBack={() => actions.clearSelectedFeature()} />
            <Card feature={state.selectedFeature} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Ahti;
