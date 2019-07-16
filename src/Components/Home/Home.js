import React, { useContext } from 'react';
import Slider from 'react-slick';
import { Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { GlobalGeoContext } from '../../App';
import Button from '../Button/Button';
import MapOverlay from '../MapOverlay/MapOverlay';
import Section from '../Section/Section';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import RoundBoxWithText from '../RoundBox/RoundBox';
import TertiaryTitle from '../TertiaryTitle/TertiaryTitle';
import VerticalBlock from '../VerticalBlock/VerticalBlock';

import { ReactComponent as Beach } from '../../assets/icons/beach.svg';
import { ReactComponent as Boat } from '../../assets/icons/boat.svg';
import { ReactComponent as Park } from '../../assets/icons/park.svg';

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

// TODO: show different amount of components based on width
const sliderSettings1 = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3.5,
  slidesToScroll: 2,
  adaptiveHeight: true,
};

// TODO: show different amount of components based on width
const sliderSettings2 = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1.5,
  slidesToScroll: 2,
  adaptiveHeight: true,
};

export default () => {
  const contextGeoData = useContext(GlobalGeoContext);
  const unmutatedGeoData = [...contextGeoData];
  const unmutatedGeoDataTypesList = [
    ...new Set(contextGeoData.map(point => point.properties.type)),
  ];
  const geoDataByTypes = [
    ...new Set(contextGeoData.map(point => point.properties.type)),
  ].filter(type => type !== 'island');

  const selectedIslands = [...unmutatedGeoData].filter(
    point => point.properties.type === 'island'
  );

  let selectedIsland =
    selectedIslands.length > 0
      ? selectedIslands[Math.floor(Math.random() * selectedIslands.length)]
      : {};

  const filteredSummerActivities = [...unmutatedGeoData].filter(point =>
    ['island', 'cafe', 'beach', 'boat', 'pool'].includes(point.properties.type)
  );

  let demoImage = '';

  return (
    <React.Fragment>
      <MapOverlay>
        <SecondaryTitle>Find your way around the sea</SecondaryTitle>
        <Link to="/map">
          <Button>See all places</Button>
        </Link>
      </MapOverlay>
      <Section>
        <SecondaryTitle>Popular places around</SecondaryTitle>
        <Slider {...sliderSettings1}>
          {/* {contextGeoData
            .filter(point => point.properties.type === 'beach')
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
            ))} */}
          {[...unmutatedGeoDataTypesList].map(type => {
            return (
              <RoundBoxWithText
                icon={<Beach />}
                title={<TertiaryTitle> {type} </TertiaryTitle>}
                pathToList={`/map?type=${type}` || '/map'}
              ></RoundBoxWithText>
            );
          })}

          {/** they are here for demo purposes, all types should be automatically generated */}
          <RoundBoxWithText
            icon={<Boat />}
            title={<TertiaryTitle> Boat rentals </TertiaryTitle>}
            pathToList={'/map?type=boat' || '/map'}
          ></RoundBoxWithText>
          <RoundBoxWithText
            icon={<Park />}
            title={<TertiaryTitle> Parks </TertiaryTitle>}
            pathToList={'/map?type=park' || '/map'}
          ></RoundBoxWithText>
        </Slider>
      </Section>
      {selectedIsland.properties && (
        <Section
          withImage="true"
          imageURL="https://images.unsplash.com/photo-1562593028-2e975fe28a0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
        >
          <SecondaryTitle>{selectedIsland.properties.fi.name}</SecondaryTitle>
          <p>
            {selectedIsland.properties.fi.header ||
              `An island where you can spend the
            whole day with the family`}
          </p>
          <Link to={`/map?tag=${selectedIsland.properties.en.name}`}>
            <Button whiteBtn="true">See all</Button>
          </Link>
        </Section>
      )}
      <Section>
        <SecondaryTitle>Things to try during the summer</SecondaryTitle>
        <Slider {...sliderSettings2}>
          {[...unmutatedGeoDataTypesList]
            .filter(type =>
              ['island', 'cafe', 'beach', 'boat', 'pool'].includes(type)
            )
            .map(type => {
              if (type === 'island') {
                demoImage =
                  'https://images.unsplash.com/photo-1509280951623-4a17506e3eb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80';
              } else if (type === 'cafe') {
                demoImage =
                  'https://images.unsplash.com/photo-1496048977749-6c44d362880c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80';
              } else if (type === 'pool') {
                demoImage =
                  'https://images.unsplash.com/photo-1542668595-fa9394e5b686?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80';
              } else if (type === 'beach') {
                demoImage =
                  'https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80';
              }
              return (
                <Link to={`/map?type=${type}` || '/map'}>
                  <VerticalBlock
                    withImage="true"
                    imageURL={
                      demoImage ||
                      'https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
                    }
                    key={type + Math.random()}
                  >
                    <SecondaryTitle>Popular place {type}</SecondaryTitle>
                  </VerticalBlock>
                </Link>
              );
            })}
        </Slider>
      </Section>

      <Section
        withImage="true"
        imageURL="https://images.unsplash.com/photo-1507911618740-de629a41dd34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
      >
        <SecondaryTitle>Going with a boat?</SecondaryTitle>
        <p>
          Discover visitor harbours, water routes and critical signs in one map
        </p>
        <Link to="/map">
          <Button whiteBtn="true">View service providers</Button>
        </Link>
      </Section>
    </React.Fragment>
  );
};
