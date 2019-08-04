import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import queryString from 'query-string';
import SliderCard from '../SliderCard/SliderCard';
import { getPointQuery } from '../../utils';

// TODO: add actions on swipe http://hammerjs.github.io/getting-started/

const Carousel = ({
  currentSlide,
  location,
  displayedPoints,
  setCurrentSlide,
  flyToPoint,
}) => {
  const [sliderRef, setSlideRef] = useState(null);

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
      slidesToShow={1}
      slidesToScroll={1}
      centerMode={true}
      //this doesn't understand rem for some reason
      centerPadding={'18px'}
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
      {displayedPoints.map((point, id) => {
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
