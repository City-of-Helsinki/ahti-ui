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
      this.props.previousSlide &&
      this.props.displayedPoints[this.props.previousSlide]
        ? this.props.previousSlide
        : 0,
    beforeChange: (current, next) => {
      if (current !== next && this.props.displayedPoints[next]) {
        this.props.flyToPoint(next, 300);
      }
    },
    afterChange: current => this.props.setCurrentSlide(current),
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.displayedPoints !== this.props.displayedPoints) {
      return true;
    }

    return nextProps.viewport === this.props.viewport;
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
          return (
            <SliderCard
              point={point}
              key={id}
              query={query}
              _onClick={this.props.setPreviousSlide(this.props.currentSlide)}
            />
          );
        })}
      </Slider>
    );
  }
}
