import React from 'react';
import { Feature } from '../../../domain/api/generated/types.d';
import CategoryIcon from '../CategoryIcon/CategoryIcon';
import { getFirstImageUrl } from '../../utils/images';
import styles from './ListViewCard.module.scss';

export interface ListViewCardProps {
  readonly feature: Feature;
}

const ListViewCard: React.FC<ListViewCardProps> = ({ feature }) => {
  const category = feature?.properties?.category?.name;
  const name = feature?.properties?.name;
  const shortDescription = feature?.properties?.shortDescription;
  const imageUrl = getFirstImageUrl(feature?.properties?.images);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <CategoryIcon category={category} className={styles.bigIcon} />
        <div className={styles.infoTextContainer}>
          <h2 className={styles.heading}>{name}</h2>
          <div className={styles.shortDescription}>{shortDescription}</div>
        </div>
      </div>
      <img src={imageUrl} className={styles.image} />
    </div>
  );
};

export default ListViewCard;
