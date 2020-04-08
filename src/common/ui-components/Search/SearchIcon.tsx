import React from 'react';
import classNames from 'classnames';

import styles from './Search.module.scss';

const SearchIcon: React.FC<any> = ({}) => {
  return (
    <div className={classNames(styles.searchIcon)}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default SearchIcon;
