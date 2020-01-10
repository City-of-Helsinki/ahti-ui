import React from 'react';
import CarouselWrapper from '../../CarouselWrapper/CarouselWrapper';
import POIList from './POIList';
import Carousel from '../../Carousel/Carousel';
import { useWindowSize } from '../../../common/utils/hooks';

import { lg } from '../../../common/constants/breakpoints';

const MemoCarousel = React.memo(Carousel);

const ResponsivePOIList = ({
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
  const size = useWindowSize();

  return (
    (size.width < lg && (
      <CarouselWrapper>
        <MemoCarousel
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          flyToPoint={flyToPoint}
          displayedPoints={displayedPoints}
          location={location}
        />
      </CarouselWrapper>
    )) || <POIList data={displayedPoints} setCurrentSlide={setCurrentSlide} />
  );
};

export default ResponsivePOIList;
