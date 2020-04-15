import React from 'react';
import classNames from 'classnames';
import Slider from 'react-slick';

import { CommonSliderProps } from '../Slider';
import '../Slider.scss';
import Slide from '../Slide/Slide';
import { Feature } from '../../../../domain/api/generated/types.d';
import { getFirstImageUrl } from '../../../utils/images';

export interface FeatureSliderProps extends CommonSliderProps {
  readonly className?: string;
  readonly features: Feature[];
  onClick?(feature: Feature): void;
}

const FeatureSlider: React.FC<FeatureSliderProps> = ({
  className,
  slideClassName,
  features,
  onClick,
  infinite = false,
  initialSlide = 0,
  slidesToScroll = 1,
  slidesToShow = 2,
  speed = 500,
}) => {
  const sliderSettings = {
    arrows: true,
    initialSlide: initialSlide,
    infinite: infinite,
    speed: speed,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
  };

  return (
    <div className={classNames(className, 'commonSlider')}>
      <Slider {...sliderSettings}>
        {features.map((feature: Feature, id: number) => (
          <Slide
            key={id}
            imageUrl={getFirstImageUrl(feature.properties.images)}
            className={slideClassName}
            onClick={() => onClick && onClick(feature)}
          >
            <p>{feature.properties.name}</p>
          </Slide>
        ))}
      </Slider>
    </div>
  );
};

export default FeatureSlider;
