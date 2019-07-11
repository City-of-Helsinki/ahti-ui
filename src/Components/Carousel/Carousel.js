import React from 'react';
import { FlyToInterpolator } from 'react-map-gl';
import { Header } from 'semantic-ui-react';
import Slider from 'react-slick';

export default ({ viewport, setViewport, displayedPoints }) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => {
      if (displayedPoints[next]) {
        const longitude = displayedPoints[next].geometry.coordinates[0];
        const latitude = displayedPoints[next].geometry.coordinates[1];
        setViewport({
          longitude,
          latitude,
          zoom: 15,
          transitionInterpolator: new FlyToInterpolator(),
          transitionDuration: 2000,
        });
      }
    },
  };

  let sortedPoints = displayedPoints.sort(
    (a, b) => a.geometry.coordinates[0] - b.geometry.coordinates[0]
  );
  return (
    <Slider {...sliderSettings}>
      {sortedPoints.map((point, id) => (
        <div key={id}>
          <Header as="h3">{point.properties.name}</Header>
        </div>
      ))}
    </Slider>
  );
};
