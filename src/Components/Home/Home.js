import React from 'react';
import Slider from 'react-slick';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Home.scss';

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

export default ({ pointData }) => {
  const dataTypes = () => {
    return [...new Set(pointData.map(point => point.properties.type))];
  };

  return (
    <div>
      <Header as="h1">Discover</Header>
      <Slider {...sliderSettings}>
        {pointData &&
          dataTypes().map((point, id) => (
            <Link
              to={{
                pathname: '/map',
                search: `?collection=${point}`,
              }}
              key={id}
            >
              <Header as="h3" className="collection-header">
                {point}
              </Header>
              <img
                src="https://images.unsplash.com/photo-1562670652-e5947bddb335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                alt="moroQ"
              />
            </Link>
          ))}
      </Slider>
    </div>
  );
};
