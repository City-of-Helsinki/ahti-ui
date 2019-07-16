import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import Slider from 'react-slick';
import queryString from 'query-string';

export default class Carousel extends React.Component {
  sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
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
      <Slider {...this.sliderSettings} ref={slider => (this.slider = slider)}>
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
            <div key={id}>
              <Link
                to={{
                  pathname: '/map',
                  search: query,
                }}
                onClick={() => {
                  this.props.setPreviousSlide(this.props.currentSlide);
                }}
              >
                <Header as="h3">{point.properties.fi.name}</Header>
              </Link>
            </div>
          );
        })}
      </Slider>
    );
  }
}
