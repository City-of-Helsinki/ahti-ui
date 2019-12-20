import styled from 'styled-components';

// used to lift component on map
// TODO: make sure there is padding around the component like in designs, not 100% finished for now
const CarouselWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  /* NOTE: This is meant to be just about enough space for mapbox logo */
  bottom: 32px;
  width: 100%;
  overflow: hidden;
  z-index: 2;

  // todo: fix this later;
  /* rewrite libraries*/

  .slick-slider {
    margin-right: 0rem;
    margin-left: 0rem;
    box-sizing: border-box;
  }

  .slick-list {
    padding-left: 0rem;
  }

  .slick-slide {
    box-sizing: border-box;
    padding: 0rem 0.5rem;
    color: inherit;
    width: 350px;

    a {
      color: inherit;
    }
  }
`;

export default CarouselWrapper;
