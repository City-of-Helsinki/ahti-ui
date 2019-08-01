import React, { useContext } from 'react';
import Slider from 'react-slick';
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
import BodyText from '../BodyText/BodyText';

const POINT_TYPES = [
  'island',
  'route',
  'cityboat',
  'rent',
  'sup',
  'experience',
  'kayak',
  'charter',
  'sightseeing',
  'learn',
  'taxi',
  'visitor',
  'parking',
  'station',
];

// these are just placeholder for now
const PROMOTION_POINT_NAMES = [
  'Skipperi - Otsolahden Satama',
  'Skipperi - Keilaniemi',
  'JT-Line Kauppatori',
  'Cafe Silo',
];

// TODO: show different amount of components based on width
const filterSliderSettings = {
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
const promotionSliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1.5,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

export default () => {
  const { t, i18n } = useTranslation();
  const contextGeoData = useContext(GlobalGeoContext);

  const islands = contextGeoData.filter(
    point => point.properties.type === 'island'
  );

  const promotionPoints = [...contextGeoData]
    .filter(point => PROMOTION_POINT_NAMES.includes(point.properties.fi.name))
    // this shuffles the points
    .sort(() => 0.5 - Math.random());

  const promotionIsland = islands[Math.floor(Math.random() * islands.length)];

  return (
    <React.Fragment>
      <MapOverlay>
        <SecondaryTitle> {t('home.main_header')}</SecondaryTitle>
        <LinkBox to="/map">{t('home.see_all_button')}</LinkBox>
      </MapOverlay>
      <HelsinkiWave />
      <Section>
        <SecondaryTitle>{t('home.section1_header')}</SecondaryTitle>
        <Slider {...filterSliderSettings}>
          {POINT_TYPES.map((type, id) => (
            <RoundBoxWithText
              key={id}
              iconURL={`/icons/type/${type}.svg`}
              title={<TertiaryTitle> {t(`types.${type}`)} </TertiaryTitle>}
              pathToList={`/map?type=${type}` || '/map'}
            />
          ))}
        </Slider>
      </Section>
      {promotionIsland && (
        <React.Fragment>
          <Section
            withImage="true"
            widthShadow="true"
            imageURL={`/images/${promotionIsland.properties.imageId}.jpeg`}
          >
            <SecondaryTitle>
              {promotionIsland.properties[i18n.language].name}
            </SecondaryTitle>
            <BodyText>
              {promotionIsland.properties[i18n.language].header}
            </BodyText>
            <LinkBox
              variant="white"
              to={`/map?tag=${promotionIsland.properties.fi.name}`}
            >
              {t('home.section2_button')}
            </LinkBox>
          </Section>
          <HelsinkiWave />
        </React.Fragment>
      )}
      <Section>
        <SecondaryTitle>{t('home.section3_header')}</SecondaryTitle>
        <Slider {...promotionSliderSettings}>
          {promotionPoints.map((point, id) => {
            return (
              <UnstyledLink
                to={`/map?name=${point.properties.fi.name}` || '/map'}
                key={id}
              >
                <VerticalBlock
                  withImage="true"
                  imageURL={`/images/${point.properties.imageId}.jpeg`}
                >
                  <SecondaryTitle>
                    {point.properties[i18n.language].name}
                  </SecondaryTitle>
                </VerticalBlock>
              </UnstyledLink>
            );
          })}
        </Slider>
      </Section>

      {/* <Section
        withImage="true"
        widthShadow="true"
        imageURL="https://images.unsplash.com/photo-1507911618740-de629a41dd34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
      >
        <SecondaryTitle>Going with a boat?</SecondaryTitle>
        <p>
          Discover visitor harbours, water routes and critical signs in one map
        </p>
        <LinkBox to="/map" variant="white">
          View service providers
        </LinkBox>
      </Section> */}
      <Footer />
    </React.Fragment>
  );
};
