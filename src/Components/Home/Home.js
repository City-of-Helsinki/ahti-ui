import React, { useContext } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlobalGeoContext } from '../../App';
import LinkBox from '../LinkBox/LinkBox';
import MapOverlay from '../MapOverlay/MapOverlay';
import Footer from '../Footer/Footer';
import Section from '../Section/Section';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import RoundBoxWithText from '../RoundBox/RoundBox';
import TertiaryTitle from '../TertiaryTitle/TertiaryTitle';
import UnstyledLink from '../UnstyledLink/UnstyledLink';
import VerticalBlock from '../VerticalBlock/VerticalBlock';
import HelsinkiWave from '../HelsinkiWave/HelsinkiWave';

import { ReactComponent as Beach } from '../../assets/icons/beach.svg';
import { ReactComponent as Boat } from '../../assets/icons/boat.svg';
import { ReactComponent as Park } from '../../assets/icons/park.svg';

// TODO: show different amount of components based on width
const sliderSettings1 = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3.5,
  slidesToScroll: 2,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 390,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 330,
      settings: {
        slidesToShow: 2.5,
      },
    },
  ],
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
  const { t, i18n } = useTranslation();
  const contextGeoData = useContext(GlobalGeoContext);
  const unmutatedGeoData = [...contextGeoData];
  const unmutatedGeoDataTypesList = [
    ...new Set(contextGeoData.map(point => point.properties.type)),
  ];

  const selectedIslands = unmutatedGeoData.filter(
    point => point.properties.type === 'island'
  );

  let selectedIsland =
    selectedIslands.length > 0
      ? selectedIslands[Math.floor(Math.random() * selectedIslands.length)]
      : {};

  let demoImage = '';

  return (
    <React.Fragment>
      <MapOverlay>
        <SecondaryTitle> {t('home.main_header')}</SecondaryTitle>
        <Link to="/map">
          <LinkBox>{t('home.see_all_button')}</LinkBox>
        </Link>
      </MapOverlay>
      <HelsinkiWave />
      <Section>
        <SecondaryTitle>{t('home.section1_header')}</SecondaryTitle>
        <Slider {...sliderSettings1}>
          {unmutatedGeoDataTypesList.map((type, id) => {
            return (
              <RoundBoxWithText
                key={id}
                icon={<Beach />}
                title={<TertiaryTitle> {t(`types.${type}`)} </TertiaryTitle>}
                pathToList={`/map?type=${type}` || '/map'}
              />
            );
          })}

          {/** they are here for demo purposes, all types should be automatically generated */}
          <RoundBoxWithText
            icon={<Boat />}
            title={<TertiaryTitle> Boat rentals </TertiaryTitle>}
            pathToList={'/map?type=boat' || '/map'}
          />
          <RoundBoxWithText
            icon={<Park />}
            title={<TertiaryTitle> Parks </TertiaryTitle>}
            pathToList={'/map?type=park' || '/map'}
          />
        </Slider>
      </Section>
      {selectedIsland.properties && (
        <React.Fragment>
          <Section
            withImage="true"
            widthShadow="true"
            imageURL="https://images.unsplash.com/photo-1562593028-2e975fe28a0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
          >
            <SecondaryTitle>
              {selectedIsland.properties[i18n.language].name}
            </SecondaryTitle>
            <p>
              {selectedIsland.properties[i18n.language].header ||
                `An island where you can spend the
            whole day with the family`}
            </p>
            <Link to={`/map?name=${selectedIsland.properties.fi.name}`}>
              <LinkBox variant="white">{t('home.section2_button')}</LinkBox>
            </Link>
          </Section>
          <HelsinkiWave />
        </React.Fragment>
      )}
      <Section>
        <SecondaryTitle>{t('home.section3_header')}</SecondaryTitle>
        <Slider {...sliderSettings2}>
          {unmutatedGeoDataTypesList
            .filter(type =>
              ['island', 'cafe', 'beach', 'boat', 'pool'].includes(type)
            )
            .map((type, id) => {
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
                <UnstyledLink to={`/map?type=${type}` || '/map'} key={id}>
                  <VerticalBlock
                    withImage="true"
                    imageURL={
                      demoImage ||
                      'https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80'
                    }
                    key={type + Math.random()}
                  >
                    <SecondaryTitle>
                      Popular place {t(`types.${type}`)}
                    </SecondaryTitle>
                  </VerticalBlock>
                </UnstyledLink>
              );
            })}
        </Slider>
      </Section>

      <Section
        withImage="true"
        widthShadow="true"
        imageURL="https://images.unsplash.com/photo-1507911618740-de629a41dd34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
      >
        <SecondaryTitle>Going with a boat?</SecondaryTitle>
        <p>
          Discover visitor harbours, water routes and critical signs in one map
        </p>
        <Link to="/map">
          <LinkBox variant="white">View service providers</LinkBox>
        </Link>
      </Section>
      <Footer />
    </React.Fragment>
  );
};
