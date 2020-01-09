import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import queryString from 'query-string';
import SliderCard from '../SliderCard/SliderCard';
import { getPointQuery } from '../../common/utils/utils';

// TODO: add actions on swipe http://hammerjs.github.io/getting-started/

const Carousel = ({
  currentSlide,
  location,
  displayedPoints,
  setCurrentSlide,
  flyToPoint,
}: {
  currentSlide: any;
  location: any;
  displayedPoints: any;
  setCurrentSlide: any;
  flyToPoint: any;
}) => {
  const [sliderRef, setSlideRef] = useState<any>(null);

  // Sync the top-state with Slider's internal state. They would otherwise get out of sync in cases where we set the currentSlide directly and change the size of the displayed points.
  useEffect(() => {
    if (sliderRef) {
      // dontAnimate = true
      sliderRef.slickGoTo(currentSlide, true);
    }
  }, [currentSlide, sliderRef]);
  return (
    <Slider
      ref={setSlideRef}
      dots={false}
      infinite={false}
      speed={500}
      //this doesn't understand rem for some reason
      centerPadding={'18px'}
      variableWidth={true}
      beforeChange={(current, next) => {
        if (
          current !== next &&
          displayedPoints[next] &&
          next !== currentSlide
        ) {
          flyToPoint(displayedPoints[next].geometry, 500);
        }
      }}
      afterChange={current => setCurrentSlide(current)}
    >
      {displayedPoints.map((point: any, id: string | number | undefined) => {
        return (
          <SliderCard
            point={point}
            key={id}
            query={getPointQuery(point, queryString.parse(location.search))}
          />
        );
      })}
    </Slider>
  );
};

export default Carousel;
