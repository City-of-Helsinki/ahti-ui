import React from 'react';
import { FlyToInterpolator } from 'react-map-gl';
import { Header } from 'semantic-ui-react';
import Slider from 'react-slick';

const Carousel = ({ setViewport, displayedPoints }) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => {
      if (displayedPoints[next]) {
        const longitude = displayedPoints[next].geometry.coordinates[0];
        const latitude = displayedPoints[next].geometry.coordinates[1];
        setViewport({
          longitude,
          latitude,
          zoom: 12,
          transitionInterpolator: new FlyToInterpolator(),
          transitionDuration: 300,
        });
      }
    },
  };

  return (
    <Slider {...sliderSettings}>
      {displayedPoints.map((point, id) => (
        <div key={id}>
          <Header as="h3">{point.properties.name}</Header>
        </div>
      ))}
    </Slider>
  );
};

export default React.memo(Carousel);
