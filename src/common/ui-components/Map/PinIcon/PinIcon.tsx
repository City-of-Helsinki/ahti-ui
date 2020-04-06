import React from 'react';
import classNames from 'classnames';

import { ReactComponent as IconLocation } from '../../../../assets/icons/pins/pin-island.svg';
import { ReactComponent as IconFood } from '../../../../assets/icons/pins/pin-restaurant.svg';
import { ReactComponent as IconRoute } from '../../../../assets/icons/pins/pin-route.svg';
import { ReactComponent as IconWaterTaxi } from '../../../../assets/icons/pins/pin-water-taxi.svg';
import { ReactComponent as IconSauna } from '../../../../assets/icons/pins/pin-sauna.svg';
import { ReactComponent as IconCafe } from '../../../../assets/icons/pins/pin-cafe.svg';
import { ReactComponent as IconMarina } from '../../../../assets/icons/pins/pin-marina.svg';
import styles from './PinIcon.module.scss';

interface CategoryIconProps {
  readonly className?: string;
  readonly category?: string;
}

const PinIcon: React.FC<CategoryIconProps> = ({ className, category }) => {
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
      Icon = IconRoute;
      break;
    case 'ahti:category:watertaxi':
      Icon = IconWaterTaxi;
      break;
    default:
      Icon = IconLocation;
  }

  return <Icon className={classNames(className, styles.offset)} />;
};

export default PinIcon;
