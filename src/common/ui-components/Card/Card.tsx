import React from 'react';
import classNames from 'classnames';

import CardImageContainer from './common/CardImageContainer';
import styles from './Card.module.scss';
import HarborContent from './harbor/HarborContent';
import FerryContent from './ferry/FerryContent';
import IslandContent from './island/IslandContent';
import { Filter } from '../../../../alltypes';
import { Tag } from '../../../domain/api/generated/types.d';

export interface CardProps {
  readonly className?: string;
  readonly feature: any;
  onSelectFilter?(filter: Filter): void;
}

const Card: React.FC<CardProps> = ({
  className,
  feature,
  onSelectFilter
}: CardProps) => {
  const type = feature.__typename;
  const { name, images, tags } = feature.properties;
  const { postalCode, municipality } = feature.properties.contactInfo.address;

  const renderTags = () => {
    return (
      <>
        {tags.map((tag: Tag, id: number) => (
          <span
            key={id}
            className={styles.tagsContainerSpan}
            role={'button'}
            onClick={() =>
              onSelectFilter && onSelectFilter({ id: tag.id, name: tag.name })
            }
          >{`#${tag.name}`}</span>
        ))}
      </>
    );
  };

  return (
    <div className={classNames(styles.cardContainer, className)}>
      <div className={styles.cardContentContainer}>
        {images && images.length > 0 && <CardImageContainer images={images} />}
        <div className={styles.cardTextContainer}>
          <h1 className={styles.nameHeading}>{name}</h1>
          <h2
            className={styles.addressHeading}
          >{`${postalCode} ${municipality}`}</h2>
          <div className={styles.tagsContainer}>{renderTags()}</div>

          {type === 'Feature' && <IslandContent island={feature} />}
          {type === 'Harbor' && <HarborContent harbor={feature} />}
          {type === 'Ferry' && <FerryContent ferry={feature} />}
        </div>
      </div>
    </div>
  );
};

export default Card;
