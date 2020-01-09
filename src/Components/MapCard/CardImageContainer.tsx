import React from 'react';
import Slider from 'react-slick';
import styles from './CardImageContainer.module.scss';

const CardImageContainer = ({ data }: { data: any }) => {
  return (
    <div className={styles.container}>
      <div className={'resetSlider'}>
        <Slider className={styles.slider}>
          {data.images.map((image: any, id: number) => {
            console.log(image.url);
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
      <div className={styles.details}>
        <h3 className={styles.name}>{data.name}</h3>
        <p className={styles.bodyText}>{data.header}</p>
      </div>
    </div>
  );
};

export default CardImageContainer;
