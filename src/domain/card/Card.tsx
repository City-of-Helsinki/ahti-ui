import React from 'react';
import BackButton from '../../Components/BackButton/BackButton';
import CardTextContainer from '../../Components/CardTextContainer/CardTextContainer';
import CardImageContainer from './common/CardImageContainer';
import styles from './Card.module.scss';
import HarborContent from './harbor/HarborContent';
import FerryContent from './ferry/FerryContent';
import IslandContent from './island/IslandContent';

export interface CardProps {
  readonly feature: any;
  onBack: any;
}

const Card: React.FC<CardProps> = ({ feature, onBack }) => {
  const type = feature.__typename;
  const { name, images, tags } = feature.properties;
  const { postalCode, municipality } = feature.properties.contactInfo.address;

  const renderTags = () => {
    return (
      <>
        {tags.map((tag: any, id: number) => (
          <span key={id}>{`#${tag.name}`}</span>
        ))}
      </>
    );
  };

  return (
    <div className={styles.cardContainer}>
      <BackButton onBack={onBack} />
      <div className={styles.cardContentContainer}>
        {images && images.length > 0 && <CardImageContainer images={images} />}
        <CardTextContainer>
          <h1 className={styles.nameHeading}>{name}</h1>
          <h2
            className={styles.addressHeading}
          >{`${postalCode} ${municipality}`}</h2>
          <div className={styles.tagsContainer}>{renderTags()}</div>

          {type === 'Feature' && <IslandContent island={feature} />}
          {type === 'Harbor' && <HarborContent harbor={feature} />}
          {type === 'Ferry' && <FerryContent ferry={feature} />}
        </CardTextContainer>
      </div>
    </div>
  );
};

export default Card;
