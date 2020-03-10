import React from 'react';

import { Feature } from '../../../domain/api/generated/types.d';
import CategoryIcon from '../CategoryIcon/CategoryIcon';
import { getRandomImageUrl } from '../../utils/images';
import styles from './ListViewCard.module.scss';

export interface ListViewCardProps {
  readonly feature: Feature;
  onClick(): void;
}

const ListViewCard: React.FC<ListViewCardProps> = ({ feature, onClick }) => {
  const category = feature?.properties?.category?.name;
  const name = feature?.properties?.name;
  const shortDescription = feature?.properties?.shortDescription;
  const imageUrl = getRandomImageUrl(feature?.properties?.images, null);

  return (
    <div className={styles.container} role={'button'} onClick={onClick}>
      <div className={styles.infoContainer}>
        <div>
          <CategoryIcon category={category} className={styles.bigIcon} />
        </div>
        <div className={styles.infoTextContainer}>
          <h2 className={styles.heading}>{name}</h2>
          <div className={styles.shortDescription}>{shortDescription}</div>
        </div>
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          className={styles.image}
          alt={''}
          width={100}
          height={84}
        />
      )}
    </div>
  );
};

export default ListViewCard;
