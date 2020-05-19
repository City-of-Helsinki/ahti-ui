import React from 'react';

import WrappedMenu from '../WrappedMenu/WrappedMenu';
import Footer from '../Footer/Footer';
import SuggestionFormContainer from './SuggestionFormContainer';
import { useScrollToTop } from '../../common/utils/hooks';

const SuggestionPage: React.FC = () => {
  useScrollToTop();
  return (
    <>
      <WrappedMenu menuDark={true} />
      <SuggestionFormContainer />
      <Footer />
    </>
  );
};

export default SuggestionPage;
