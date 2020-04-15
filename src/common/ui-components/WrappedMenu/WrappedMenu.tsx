import React from 'react';
import { useHistory } from 'react-router-dom';

import Menu, { MenuItem } from '../Menu/Menu';
import { menuCategories } from '../../../domain/constants';
import { useOvermind } from '../../../domain/overmind';

const WrappedMenu: React.FC<any> = ({ menuDark }) => {
  const { actions } = useOvermind();
  const history = useHistory();

  return (
    <Menu
      menuCategories={menuCategories}
      translate={true}
      menuDark={menuDark}
      onSelect={(menuItem: MenuItem) => {
        history.push('/content');
        actions.setCategoryFiltersById(menuItem.categoryIds);
        actions.setTagFiltersById(menuItem.tagIds);
      }}
      onLogoClick={() => actions.clearContentState()}
    />
  );
};

export default WrappedMenu;
