import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import queryString from 'query-string';
import Section from '../Section/Section';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';

// TODO: add actions on swipe http://hammerjs.github.io/getting-started/

export default class Carousel extends React.Component {
  sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: '0',
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
            <Section
              key={id}
              withImage="true"
              widthShadow="true"
              imageURL="https://images.unsplash.com/photo-1536420124982-bd9d18fc47ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
            >
              <Link
                to={{
                  pathname: '/map',
                  search: query,
                }}
                onClick={() => {
                  this.props.setPreviousSlide(this.props.currentSlide);
                }}
              >
                <SecondaryTitle>{point.properties.fi.name}</SecondaryTitle>
              </Link>
            </Section>
          );
        })}
      </Slider>
    );
  }
}
