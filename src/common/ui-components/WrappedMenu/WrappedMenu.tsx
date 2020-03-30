import React from 'react';

import Menu, { MenuItem } from '../Menu/Menu';
import Search from '../Search/Search';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { SUPPORTED_LANGUAGES } from '../../../common/translation/TranslationConstants';
import { menuCategories } from '../../../domain/constants';
import { useOvermind } from '../../../domain/overmind';

const WrappedMenu: React.FC<any> = ({ menuDark }) => {
  const { state, actions } = useOvermind();
  return (
    <Menu
      menuCategories={menuCategories}
      translate={true}
      menuDark={menuDark}
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
        />
      }
      openComponent={
        <LanguageSelect
          supportedLanguages={Object.values(SUPPORTED_LANGUAGES)}
          darkMenu={menuDark}
        />
      }
    />
  );
};

export default WrappedMenu;
