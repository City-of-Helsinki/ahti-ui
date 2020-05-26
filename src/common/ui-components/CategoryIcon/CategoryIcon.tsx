import React from 'react';

import { ReactComponent as IconLocation } from '../../../assets/icons/icon-location.svg';
import { ReactComponent as IconFood } from '../../../assets/icons/icon-food.svg';
import { ReactComponent as IconRoute } from '../../../assets/icons/icon-route.svg';
import { ReactComponent as IconSightseeing } from '../../../assets/icons/icon-sightseeing.svg';
import { ReactComponent as IconWaterTaxi } from '../../../assets/icons/icon-water-taxi.svg';
import { ReactComponent as IconSauna } from '../../../assets/icons/icon-sauna.svg';
import { ReactComponent as IconCafe } from '../../../assets/icons/icon-cafe.svg';
import { ReactComponent as IconMarina } from '../../../assets/icons/icon-marina.svg';
import { ReactComponent as IconGas } from '../../../assets/icons/icon-gas.svg';
import styles from './CategoryIcon.module.scss';

interface CategoryIconProps {
  readonly className?: string;
  readonly category?: string;
}

export const CATEGORY_ICONS_MAP: Record<string, any> = {
  'ahti:category:island': IconLocation,
  'ahti:category:restaurant': IconFood,
  'ahti:category:cafe': IconCafe,
  'ahti:category:sauna': IconSauna,
  'ahti:category:harbor': IconMarina,
  'ahti:category:ferry': IconRoute,
  'ahti:category:route': IconRoute,
  'ahti:category:sightseeing': IconSightseeing,
  'ahti:category:watertaxi': IconWaterTaxi,
  'ahti:category:service_station': IconGas,
  'ahti:category:water_taxi': IconWaterTaxi,
};

const CategoryIcon: React.FC<CategoryIconProps> = ({ className, category }) => {
  const Icon = CATEGORY_ICONS_MAP[category] || IconLocation;
  return <Icon className={className ? className : styles.icon} />;
};

export default CategoryIcon;
