import React from 'react';

import Menu, { MenuItem } from '../Menu/Menu';
import { menuCategories } from '../../../domain/constants';
import { useOvermind } from '../../../domain/overmind';

const WrappedMenu: React.FC<any> = ({ menuDark }) => {
  const { actions } = useOvermind();
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
    />
  );
};

export default WrappedMenu;
