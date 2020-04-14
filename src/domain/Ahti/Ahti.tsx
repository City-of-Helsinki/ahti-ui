import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Footer from '../Footer/Footer';
import ContentPage from '../ContentPage/ContentPage';
import IndexPage from '../IndexPage/IndexPage';
import {
  useFeatures,
  useTags,
  useCategories,
  useUrlState,
} from '../utils/hooks';
import styles from './Ahti.module.scss';

const Ahti: React.FC = () => {
  useUrlState();
  useTags();
  useCategories();
  useFeatures();

  return (
    <div className={styles.ahti}>
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
