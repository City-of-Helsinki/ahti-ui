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

  for (let i = 0; i < dots; ++i) {
    children.push(
      <button key={i} onClick={() => setIndex(i)}>
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
  if (images.length === 0) {
    return null;
  }

  const [index, setIndex] = useState(0);

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
                backgroundSize: 'cover'
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
      <Pagination dots={images.length} index={index} setIndex={setIndex} />
    </div>
  );
};

export default CardImageContainer;
