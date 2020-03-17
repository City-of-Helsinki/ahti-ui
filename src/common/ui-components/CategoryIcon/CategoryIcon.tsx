import React from 'react';
import { IconLocation, IconFood } from 'hds-react';

import styles from './CategoryIcon.module.scss';

interface CategoryIconProps {
  readonly className?: string;
  readonly category?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ className, category }) => {
  let Icon;

  if (category === 'ahti:category:island') {
    Icon = IconLocation;
  } else if (
    category === 'ahti:category:restaurant' ||
    category === 'ahti:category:cafe'
  ) {
    Icon = IconFood;
  } else {
    Icon = IconLocation;
  }

  return <Icon className={className ? className : styles.icon} />;
};

export default CategoryIcon;
