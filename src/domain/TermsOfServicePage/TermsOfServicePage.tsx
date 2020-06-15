import React from 'react';
import { Koros } from 'hds-react';

import WrappedMenu from '../WrappedMenu/WrappedMenu';
import TermsOfService from './TermsOfService';
import Footer from '../Footer/Footer';
import styles from './TermsOfServicePage.module.scss';

const TermsOfServicePage = () => {
  return (
    <>
      <WrappedMenu menuDark={true} />
      <Koros flipHorizontal={true} className={styles.koros} />
      <TermsOfService />
      <Footer />
    </>
  );
};

export default TermsOfServicePage;
