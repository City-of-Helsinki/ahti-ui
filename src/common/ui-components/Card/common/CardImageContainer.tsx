import React, { Dispatch, SetStateAction, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames/bind';

import styles from './CardImageContainer.module.scss';
import { Image } from '../../../../domain/api/generated/types.d';

const cx = classNames.bind(styles);

interface PaginationProps {
  readonly dots: number;
  readonly index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ dots, index, setIndex }) => {
  const children = [];

  for (let i = 0; i < dots; i += 1) {
    children.push(
      <button key={i} onClick={() => setIndex(i)} tabIndex={0}>
        <div className={cx(styles.dot, { dotEnabled: i === index })} />
      </button>
    );
  }

  return (
    <div className={styles.dotsContainer}>
      <div className={styles.dots}>{children}</div>
    </div>
  );
};

export interface CardImageContainerProps {
  readonly images: Image[];
}

const CardImageContainer: React.FC<CardImageContainerProps> = ({ images }) => {
  const [index, setIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      className={styles.container}
      onClick={() => setIndex((index + 1) % images.length)}
    >
      <SwipeableViews index={index} enableMouseEvents>
        {images.map((image: Image, id: number) => {
          return (
            <div
              className={styles.slideContainer}
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundSize: 'cover',
              }}
              key={id}
            >
              <p
                className={styles.copyrightOwner}
              >{`© ${image.copyrightOwner}`}</p>
            </div>
          );
        })}
      </SwipeableViews>
      {images.length > 1 && (
        <Pagination dots={images.length} index={index} setIndex={setIndex} />
      )}
    </div>
  );
};

export default CardImageContainer;
