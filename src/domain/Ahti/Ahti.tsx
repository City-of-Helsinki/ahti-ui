import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SuggestionPage from '../SuggestionPage/SuggestionPage';
import ContentPage from '../ContentPage/ContentPage';
import IndexPage from '../IndexPage/IndexPage';
import TermsOfServicePage from '../TermsOfServicePage/TermsOfServicePage';
import TestingEnvironmentWarning from '../TestingEnvironmentWarning/TestingEnvironmentWarning';
import { useFeatures, useUrlState } from '../utils/hooks';
import styles from './Ahti.module.scss';

const Ahti: React.FC = () => {
  useUrlState();
  useFeatures();

  return (
    <>
      <TestingEnvironmentWarning />
      <div className={styles.ahti}>
        <Switch>
          <Route path="/content" component={ContentPage} />
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/new" component={SuggestionPage} />
          <Route exact path="/terms" component={TermsOfServicePage} />
        </Switch>
        <ToastContainer />
      </div>
    </>
  );
};

export default Ahti;
