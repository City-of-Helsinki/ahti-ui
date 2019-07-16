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
  const geoDataByTypes = [
    ...new Set(contextGeoData.map(point => point.properties.type)),
  ].filter(type => type !== 'island');
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
          {contextGeoData
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
            ))}
          <RoundBoxWithText
            icon={<Beach />}
            title={<TertiaryTitle> Beaches </TertiaryTitle>}
            pathToList={'/map?type=beach' || 'map'}
          ></RoundBoxWithText>
          <RoundBoxWithText
            icon={<Boat />}
            title={<TertiaryTitle> Boat rentals </TertiaryTitle>}
          ></RoundBoxWithText>
          <RoundBoxWithText
            icon={<Park />}
            title={<TertiaryTitle> Parks </TertiaryTitle>}
          ></RoundBoxWithText>
          <RoundBoxWithText
            icon={<Park />}
            title={<TertiaryTitle> Parks </TertiaryTitle>}
          ></RoundBoxWithText>
          <RoundBoxWithText
            icon={<Park />}
            title={<TertiaryTitle> Parks </TertiaryTitle>}
          ></RoundBoxWithText>
        </Slider>
      </Section>
      {contextGeoData && (
        <Section
          withImage="true"
          imageURL="https://images.unsplash.com/photo-1562593028-2e975fe28a0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
        >
          <SecondaryTitle>Lonna Island</SecondaryTitle>
          <p>An island where you can spend the whole day with the family</p>
          <Link to="/map?type=island">
            <Button whiteBtn="true">See all</Button>
          </Link>
        </Section>
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
                    search: `?tag=${location.properties.fi.name}`,
                  }}
                >
                  <Header as="h3" className="collection-header">
                    {location.properties.fi.name}
                  </Header>
                </Link>
              </div>
            ))}
        </Slider>
      )}
      <Section>
        <SecondaryTitle>Things to try during the summer</SecondaryTitle>
        <Slider {...sliderSettings2}>
          {/*https://www.hel.fi//wps/wcm/connect/088dcc21-55c8-4a22-8df1-b1cb5ca6bfaa/allas.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-088dcc21-55c8-4a22-8df1-b1cb5ca6bfaa-mJh0fQ- */}
          <VerticalBlock
            withImage="true"
            imageURL="https://www.hel.fi//wps/wcm/connect/088dcc21-55c8-4a22-8df1-b1cb5ca6bfaa/allas.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE-088dcc21-55c8-4a22-8df1-b1cb5ca6bfaa-mJh0fQ-"
          ></VerticalBlock>
          <VerticalBlock
            withImage="true"
            imageURL="https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
          ></VerticalBlock>
          <VerticalBlock
            withImage="true"
            imageURL="https://images.unsplash.com/photo-1542668595-fa9394e5b686?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
          ></VerticalBlock>
          <VerticalBlock
            withImage="true"
            imageURL="https://images.unsplash.com/photo-1496048977749-6c44d362880c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
          ></VerticalBlock>
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
    </React.Fragment>
  );
};
