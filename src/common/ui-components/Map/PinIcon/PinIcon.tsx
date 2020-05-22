import React from 'react';
import classNames from 'classnames';

import { ReactComponent as IconLocation } from '../../../../assets/icons/pins/pin-island.svg';
import { ReactComponent as IconFood } from '../../../../assets/icons/pins/pin-restaurant.svg';
import { ReactComponent as IconRoute } from '../../../../assets/icons/pins/pin-route.svg';
import { ReactComponent as IconWaterTaxi } from '../../../../assets/icons/pins/pin-water-taxi.svg';
import { ReactComponent as IconSauna } from '../../../../assets/icons/pins/pin-sauna.svg';
import { ReactComponent as IconCafe } from '../../../../assets/icons/pins/pin-cafe.svg';
import { ReactComponent as IconMarina } from '../../../../assets/icons/pins/pin-marina.svg';
import { ReactComponent as IconBar } from '../../../../assets/icons/pins/pin-bar.svg';
import { ReactComponent as IconBeach } from '../../../../assets/icons/pins/pin-beach.svg';
import { ReactComponent as IconKayak } from '../../../../assets/icons/pins/pin-kayak.svg';
import { ReactComponent as IconRowingBoat } from '../../../../assets/icons/pins/pin-rowing-boat-rental.svg';
import { ReactComponent as IconFerry } from '../../../../assets/icons/pins/pin-ferry.svg';
import { ReactComponent as IconAttraction } from '../../../../assets/icons/pins/pin-attraction.svg';
import styles from './PinIcon.module.scss';

interface CategoryIconProps {
  readonly className?: string;
  readonly tags?: string[];
}

export const PIN_ICONS_MAP: Record<string, any> = {
  'ahti:category:island': IconLocation,
  'ahti:category:restaurant': IconFood,
  'ahti:category:cafe': IconCafe,
  'ahti:category:bar': IconBar,
  'ahti:category:sauna': IconSauna,
  'ahti:category:beach': IconBeach,
  'ahti:category:harbor': IconMarina,
  'ahti:category:ferry': IconFerry,
  'ahti:category:route': IconRoute,
  'ahti:category:watertaxi': IconWaterTaxi,
  'ahti:category:sightseeing': IconAttraction,

  'ahti:tag:kayak': IconKayak,
  'ahti:tag:rowing_boat': IconRowingBoat,
  'ahti:tag:canoeing': IconKayak,
  'ahti:tag:attraction': IconAttraction,
  'ahti:tag:sightseeing': IconAttraction,
};

const PinIcon: React.FC<CategoryIconProps> = ({ className, tags }) => {
  if (!tags) {
    return <IconLocation className={classNames(className, styles.offset)} />;
  }
  const Icon = PIN_ICONS_MAP[tags.find((tag) => PIN_ICONS_MAP[tag])];
  return Icon ? (
    <Icon className={classNames(className, styles.offset)} />
  ) : (
    <IconLocation className={classNames(className, styles.offset)} />
  );
};

export default PinIcon;
