import React, { useState } from 'react';
import classNames from 'classnames';

import Menu, { MenuItem } from '../../common/ui-components/Menu/Menu';
import Search from '../../common/ui-components/Search/Search';
import { menuCategories } from '../constants';
import { useOvermind } from '../overmind';
import styles from './WrappedMenu.module.scss';

interface WrappedMenuProps {
  readonly menuDark?: boolean;
}

const WrappedMenu: React.FC<WrappedMenuProps> = ({ menuDark = false }) => {
  const { state, actions } = useOvermind();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  if (isSearchOpen) {
    return (
      <div
        className={classNames(styles.wrapper, {
          [styles.transparent]: !menuDark,
        })}
      >
        <Search
          featuresToSearch={state.features}
          onSelect={(ahtiId) => {
            actions.selectFeatureById(ahtiId);
            setIsSearchOpen(false);
          }}
          onClose={() => {
            setIsSearchOpen(false);
          }}
          className={classNames({ [styles.absolute]: !menuDark })}
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Menu
        menuCategories={menuCategories}
        translate={true}
        menuDark={menuDark}
        onSelect={(menuItem: MenuItem) => {
          actions.setCategoryFiltersById(menuItem.categoryIds);
          actions.setTagFiltersById(menuItem.tagIds);
        }}
        onLogoClick={() => actions.clearContentState()}
        onSearchIconClick={() => setIsSearchOpen(true)}
        className={classNames(styles.padding, {
          [styles.menuLight]: !menuDark,
        })}
        contentClassName={classNames({ [styles.absolute]: menuDark })}
      />
    </div>
  );
};

export default WrappedMenu;
