import React from 'react';
import classNames from 'classnames';

import styles from './MenuIcon.module.scss';

const MenuIcon: React.FC<any> = ({ isDark, isOpen }) => {
  return (
    <div
      className={classNames(
        isOpen
          ? styles.navIcon3Open
          : isDark
          ? styles.navIcon3Dark
          : styles.navIcon3
      )}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default MenuIcon;
