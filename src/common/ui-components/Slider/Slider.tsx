import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { useOvermind } from '../../../domain/overmind';
import { Feature } from '../../../domain/api/generated/types.d';
import Slide from '../Slide/Slide';
import styles from './Slider.module.scss';

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
  const { actions } = useOvermind();

  return (
    <div className={classNames(styles.slickSliderContainer)}>
      <Slider {...settings}>
        {features.map((mapFeature) => (
          <Link
            key={mapFeature.id}
            to={'/content'}
            onClick={() => {
              actions.selectFeature(mapFeature);
            }}
          >
            <Slide
              key={mapFeature.id}
              backgroundImage={
                mapFeature.properties.images.length > 0
                  ? mapFeature.properties.images[0].url
                  : null
              }
            >
              <h3>{mapFeature.properties.name}</h3>
            </Slide>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default SimpleSlider;
