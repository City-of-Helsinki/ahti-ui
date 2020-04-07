import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames/bind';

import styles from './ContentPage.module.scss';
import Breadcrumb from '../../common/ui-components/Breadcrumb/Breadcrumb';
import Toggle from '../../common/ui-components/Toggle/Toggle';
import ListView from '../../common/ui-components/ListView/ListView';
import Map from '../../common/ui-components/Map/Map';
import BackButton from '../../common/ui-components/BackButton/BackButton';
import Card from '../../common/ui-components/Card/Card';
import { useOvermind } from '../overmind';
import { useScrollToTop } from '../../common/utils/hooks';
import CategoryNavigation from '../../common/ui-components/CategoryNavigation/CategoryNavigation';
import Spinner from '../../common/ui-components/Spinner/Spinner';
import spinnerAnimation from '../../common/ui-components/Spinner/animations/spinner_all.json';

import { categories } from '../constants';

import { availableCategories } from '../constants';
import { ReactComponent as IconList } from '../../assets/icons/icon-list.svg';
import { ReactComponent as IconMap } from '../../assets/icons/icon-map.svg';


const cx = classNames.bind(styles);

const ContentPage: React.FC = () => {
  const { state, actions } = useOvermind();
  const { t } = useTranslation();
  useScrollToTop();

  const makeFilterFromCategoryId = (categoryId: string) => {
    return {
      id: categoryId,
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.subHeading}>
        <Breadcrumb
          items={[...state.categoryFilters, ...state.tagFilters]}
          translated={true}
          onClose={(ahtiId) => actions.removeFilter(ahtiId)}
        />
        <Toggle
          onIcon={<IconMap />}
          onIconText={t('content.map')}
          offIcon={<IconList />}
          offIconText={t('content.list')}
          toggleState={state.mapViewToggle}
          onToggle={() => actions.toggleMapView()}
        />
      </div>
      {state.featuresLoading && (
        <Spinner
          animation={spinnerAnimation}
          width={50}
          height={50}
          className={styles.spinner}
        />
      )}
      {!state.featuresLoading && (
        <div className={styles.content}>
          {!state.selectedFeature && !state.mapViewToggle && (
            <ListView
              features={state.features}
              onClick={(feature) => {
                actions.selectFeature(feature);
              }}
            />
          )}
          {state.mapViewToggle && (
            <div
              className={cx(styles.mapContainer, {
                mapContainerShrunk: state.selectedFeature,
              })}
            >
              <Map
                className={styles.map}
                features={state.features}
                selectedFeature={state.selectedFeature}
                onClick={actions.selectFeature}
              />
            </div>
          )}
          {state.selectedFeature && (
            <React.Fragment>
              <BackButton onBack={() => actions.clearSelectedFeature()} />
              <Card
                feature={state.selectedFeature}
                onSelectFilter={actions.addTagFilter}
              />
            </React.Fragment>
          )}
        </div>
      )}
      {!state.selectedFeature && (
        <CategoryNavigation
          className={cx(styles.categoryNavigation, {
            categoryNavigationListView: !state.mapViewToggle,
          })}
          categories={Object.values(categories).map(makeFilterFromCategoryId)}
          translated={true}
          onClick={(categoryId: string) => {
            actions.addCategoryFilter(makeFilterFromCategoryId(categoryId));
          }}
        />
      )}
    </div>
  );
};

export default ContentPage;
