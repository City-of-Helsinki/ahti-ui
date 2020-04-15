import React from 'react';

import { ReactComponent as IconLocation } from '../../../assets/icons/icon-location.svg';
import { ReactComponent as IconFood } from '../../../assets/icons/icon-food.svg';
import { ReactComponent as IconRoute } from '../../../assets/icons/icon-route.svg';
import { ReactComponent as IconSightseeing } from '../../../assets/icons/icon-sightseeing.svg';
import { ReactComponent as IconWaterTaxi } from '../../../assets/icons/icon-water-taxi.svg';
import { ReactComponent as IconSauna } from '../../../assets/icons/icon-sauna.svg';
import { ReactComponent as IconCafe } from '../../../assets/icons/icon-cafe.svg';
import { ReactComponent as IconMarina } from '../../../assets/icons/icon-marina.svg';
import styles from './CategoryIcon.module.scss';

interface CategoryIconProps {
  readonly className?: string;
  readonly category?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ className, category }) => {
  let Icon;

  switch (category) {
    case 'ahti:category:island':
      Icon = IconLocation;
      break;
    case 'ahti:category:restaurant':
      Icon = IconFood;
      break;
    case 'ahti:category:cafe':
      Icon = IconCafe;
      break;
    case 'ahti:category:sauna':
      Icon = IconSauna;
      break;
    case 'ahti:category:harbor':
      Icon = IconMarina;
      break;
    case 'ahti:category:ferry':
      Icon = IconRoute;
      break;
    case 'ahti:category:route':
      Icon = IconRoute;
      break;
    case 'ahti:category:sightseeing':
      Icon = IconSightseeing;
      break;
    case 'ahti:category:watertaxi':
      Icon = IconWaterTaxi;
      break;
    default:
      Icon = IconLocation;
  }

  return <Icon className={className ? className : styles.icon} />;
};

export default CategoryIcon;
