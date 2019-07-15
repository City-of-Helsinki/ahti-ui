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

export default () => {
  const contextGeoData = useContext(GlobalGeoContext);
  const geoDataByTypes = [
    ...new Set(contextGeoData.map(point => point.properties.type)),
  ].filter(type => type !== 'island');
  return (
    <div>
      <Header as="h1">Discover</Header>
      {geoDataByTypes && (
        <Slider {...sliderSettings}>
          {geoDataByTypes.map((location, id) => (
            <div key={id}>
              <Link
                to={{
                  pathname: '/map',
                  search: `?type=${location}`,
                }}
              >
                <Header as="h3" className="collection-header">
                  {location}
                </Header>
                <img
                  src="https://images.unsplash.com/photo-1562670652-e5947bddb335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                  alt="moroQ"
                />
              </Link>
            </div>
          ))}
        </Slider>
      )}
      {contextGeoData && (
        <Slider {...sliderSettings}>
          {contextGeoData
            .filter(point => point.properties.type === 'island')
            .map((location, id) => (
              <div key={id}>
                <Link
                  to={{
                    pathname: '/map',
                    search: `?tag=${location.properties.name}`,
                  }}
                >
                  <Header as="h3" className="collection-header">
                    {location.properties.name}
                  </Header>
                </Link>
              </div>
            ))}
        </Slider>
      )}
    </div>
  );
};
