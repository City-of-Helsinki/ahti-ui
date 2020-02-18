import React from 'react';
import styles from './CardImageContainer.module.scss';
import { Image } from '../../../../domain/api/generated/types.d';

export interface CardImageContainerProps {
  readonly images: Image[];
}

const CardImageContainer: React.FC<CardImageContainerProps> = ({ images }) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div>
        <div
          className={styles.slideContainer}
          style={{
            backgroundImage: `url(${images[0].url})`,
            backgroundSize: 'cover'
          }}
        >
          <p
            className={styles.copyrightOwner}
          >{`© ${images[0].copyrightOwner}`}</p>
        </div>
      </div>
    </div>
  );
};

export default CardImageContainer;
