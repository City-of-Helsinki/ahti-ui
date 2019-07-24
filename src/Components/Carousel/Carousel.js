import React from 'react';
import Slider from 'react-slick';
import queryString from 'query-string';
import SliderCard from '../SliderCard/SliderCard';

// TODO: add actions on swipe http://hammerjs.github.io/getting-started/

export default class Carousel extends React.Component {
  sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    //this doesn't understand rem for some reason
    centerPadding: '18px',
    initialSlide:
      this.props.currentSlide &&
      this.props.displayedPoints[this.props.currentSlide]
        ? this.props.currentSlide
        : 0,
    beforeChange: (current, next) => {
      if (current !== next && this.props.displayedPoints[next]) {
        this.props.flyToPoint(this.props.displayedPoints[next].geometry, 500);
      }
    },
    afterChange: current => this.props.setCurrentSlide(current),
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.displayedPoints !== this.props.displayedPoints) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <Slider {...this.sliderSettings}>
        {this.props.displayedPoints.map((point, id) => {
          const query =
            point.properties.type === 'island'
              ? queryString.stringify({
                  tag: point.properties.fi.name,
                })
              : queryString.stringify({
                  ...queryString.parse(this.props.location.search),
                  name: point.properties.fi.name,
                });
          return <SliderCard point={point} key={id} query={query} />;
        })}
      </Slider>
    );
  }
}
