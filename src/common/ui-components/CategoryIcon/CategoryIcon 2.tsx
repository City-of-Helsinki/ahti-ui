import React from 'react';
import { IconLocation } from 'hds-react';

import styles from './CategoryIcon.module.scss';

interface CategoryIconProps {
  readonly className?: string;
  readonly category?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ className, category }) => {
  // BE only has ahti:category:island for the time being
  // other categories are null.
  if (category === 'ahti:category:island') {
    return <IconLocation className={className ? className : styles.icon} />;
  } else {
    return <IconLocation className={className ? className : styles.icon} />;
  }
};

export default CategoryIcon;
