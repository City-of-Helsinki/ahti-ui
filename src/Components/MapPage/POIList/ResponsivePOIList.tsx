import React from 'react';
import CarouselWrapper from '../../CarouselWrapper/CarouselWrapper';
import POIList from './POIList';
import Carousel from '../../Carousel/Carousel';
import { useWindowSize } from '../../../common/utils/hooks';

const MemoCarousel = React.memo(Carousel);

const ResponsivePOIList = ({
  currentSlide,
  location,
  displayedPoints,
  setCurrentSlide,
  flyToPoint,
  breakpoint,
}: {
  currentSlide: any;
  location: any;
  displayedPoints: any;
  setCurrentSlide: any;
  flyToPoint: any;
  breakpoint: number;
}) => {
  const size = useWindowSize();

  return (
    (size.width < breakpoint && (
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
