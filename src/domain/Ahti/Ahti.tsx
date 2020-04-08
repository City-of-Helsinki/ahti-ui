import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import Menu, { MenuItem } from '../../common/ui-components/Menu/Menu';
import LanguageSelect from '../../common/ui-components/LanguageSelect/LanguageSelect';
import { SUPPORTED_LANGUAGES } from '../../common/translation/TranslationConstants';
import { useOvermind } from '../overmind';
import styles from './Ahti.module.scss';
import Search from '../../common/ui-components/Search/Search';
import Footer from '../Footer/Footer';
import ContentPage from '../ContentPage/ContentPage';
import IndexPage from '../IndexPage/IndexPage';
import { menuCategories } from '../constants';
import {
  useFeatures,
  useTags,
  useCategories,
  useUrlState,
} from '../utils/hooks';

const Ahti: React.FC = () => {
  const { state, actions } = useOvermind();
  useUrlState();
  useTags();
  useCategories();
  useFeatures();

  return (
    <div className={styles.ahti}>
      <Menu
        className={styles.menu}
        menuCategories={menuCategories}
        translate={true}
        onSelect={(menuItem: MenuItem) => {
          actions.setPathname('/content');
          menuItem.categoryIds.forEach((categoryId) => {
            actions.addCategoryFilter({ id: categoryId });
          });
          menuItem.tagIds.forEach((tagId) => {
            actions.addTagFilter({ id: tagId });
          });
        }}
        onLogoClick={() => actions.clearContentState()}
        closedComponent={
          <Search
            featuresToSearch={state.features}
            onSelect={(ahtiId) => {
              actions.setPathname('/content');
              actions.selectFeatureById(ahtiId);
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
      <Switch>
        <Route path={'/content'}>
          <ContentPage />
        </Route>
        <Route path={'/'}>
          <IndexPage />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
};

export default Ahti;
