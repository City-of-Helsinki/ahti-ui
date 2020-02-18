import React from 'react';
import classNames from 'classnames';
import CardImageContainer from './common/CardImageContainer';
import styles from './Card.module.scss';
import HarborContent from './harbor/HarborContent';
import FerryContent from './ferry/FerryContent';
import IslandContent from './island/IslandContent';

export interface CardProps {
  readonly className?: string;
  readonly feature: any;
  selectFeature(ahtiId: string): void;
}

const Card: React.FC<CardProps> = ({ className, feature, selectFeature }) => {
  const type = feature.__typename;
  const { name, images, tags } = feature.properties;
  const { postalCode, municipality } = feature.properties.contactInfo.address;

  const renderTags = () => {
    return (
      <>
        {tags.map((tag: any, id: number) => (
          <span
            key={id}
            className={styles.tagsContainerSpan}
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

          {type === 'Feature' && (
            <IslandContent island={feature} selectFeature={selectFeature} />
          )}
          {type === 'Harbor' && <HarborContent harbor={feature} />}
          {type === 'Ferry' && <FerryContent ferry={feature} />}
        </div>
      </div>
    </div>
  );
};

export default Card;
