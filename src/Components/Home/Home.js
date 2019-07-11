import React, { useContext } from 'react';
import Slider from 'react-slick';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { GlobalGeoContext } from '../../App';
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
  return (
    <div>
      <Header as="h1">Discover</Header>
      <Slider {...sliderSettings}>
        {useContext(GlobalGeoContext) &&
          [
            ...new Set(
              useContext(GlobalGeoContext).map(point => point.properties.type)
            ),
          ].map((point, id) => (
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
