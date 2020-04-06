import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import { useOvermind } from '../../../domain/overmind';
import { Feature } from '../../../domain/api/generated/types.d';
import Slide from '../Slide/Slide';

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

  // console.log('state', state.features);
  return (
    <Slider {...settings}>
      {features.map((mapFeature) => (
        <Slide
          key={mapFeature.id}
          backgroundImage={
            mapFeature.properties.images.length > 0
              ? mapFeature.properties.images[0].url
              : null
          }
        >
          <Link to={'/content'}>
            <h3
              onClick={() => {
                actions.selectFeature(mapFeature);
              }}
            >
              {mapFeature.properties.name}
            </h3>
          </Link>
        </Slide>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
