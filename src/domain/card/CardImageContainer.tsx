import React from 'react';
import Slider from 'react-slick';
import styles from './CardImageContainer.module.scss';

const CardImageContainer = ({ images }: { images: any }) => {
  return (
    <div className={`${styles.container} resetSlider`}>
      <Slider>
        {images.map((image: any, id: number) => {
          return (
            <div>
              <div
                key={id}
                className={styles.slideContainer}
                style={{
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: 'cover',
                }}
              >
                <p className={styles.copyrightOwner}>
                  {`© ${image.copyrightOwner}`}
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CardImageContainer;
