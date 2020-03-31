import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';

import { Feature } from '../../../domain/api/generated/types.d';
import Slide from '../Slide/Slide';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

export interface SimpleSliderProps {
  readonly features: Feature[];
  readonly className?: string;
}

const SimpleSlider: React.FC<SimpleSliderProps> = ({ features }) => {
  const settings = {
    arrows: true,
    initialSlide: 0,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className={cx(styles.container)}>
      {features.map((feature) => (
        <Slide
          key={feature.id}
          backgroundImage={
            feature.properties.images.length > 0
              ? feature.properties.images[0].url
              : null
          }
        >
          <h3>{feature.properties.name}</h3>
        </Slide>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
