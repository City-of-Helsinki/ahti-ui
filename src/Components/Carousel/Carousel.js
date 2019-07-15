import React from 'react';
import { Link } from 'react-router-dom';
import { FlyToInterpolator } from 'react-map-gl';
import { Header } from 'semantic-ui-react';
import Slider from 'react-slick';
import queryString from 'query-string';

export default class Carousel extends React.Component {
  flyToPoint(index, transitionDuration) {
    const longitude = this.props.displayedPoints[index].geometry.coordinates[0];
    const latitude = this.props.displayedPoints[index].geometry.coordinates[1];
    if (
      Math.abs(this.props.viewport.latitude - latitude) > 0.000001 &&
      Math.abs(this.props.viewport.longitude - longitude) > 0.000001
    ) {
      this.props.setViewport({
        longitude,
        latitude,
        zoom: 12,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration,
      });
    }
  }

  sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current, next) => {
      if (current !== next && this.props.displayedPoints[next]) {
        this.flyToPoint(next, 300);
      }
    },
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.displayedPoints !== this.props.displayedPoints) {
      return true;
    }

    return nextProps.viewport === this.props.viewport;
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.displayedPoints[0]) {
        this.flyToPoint(0, 1000);
      }
    }, 500);
  }

  render() {
    return (
      <Slider {...this.sliderSettings}>
        {this.props.displayedPoints.map((point, id) => {
          const query = queryString.stringify({
            ...queryString.parse(this.props.location.search),
            name: point.properties.name,
          });
          return (
            <div key={id}>
              <Link
                to={{
                  pathname: '/map',
                  search: query,
                }}
              >
                <Header as="h3">{point.properties.name}</Header>
              </Link>
            </div>
          );
        })}
      </Slider>
    );
  }
}
