import React, { useContext } from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import { GlobalGeoContext } from '../../App';
import { GlobalIslandContext } from '../../App';
import LinkBox from '../LinkBox/LinkBox';
import MapOverlay from '../MapOverlay/MapOverlay';
import Footer from '../Footer/Footer';
import Section from '../Section/Section';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import RoundBoxWithText from '../RoundBox/RoundBox';
import TertiaryTitle from '../TertiaryTitle/TertiaryTitle';
import UnstyledLink from '../UnstyledLink/UnstyledLink';
import VerticalBlock from '../VerticalBlock/VerticalBlock';
import PromotionBlock from '../PromotionBlock/PromotionBlock';
import PromotionSlideSection from '../PromotionSlideSection/PromotionSlideSection';
import HelsinkiWave from '../HelsinkiWave/HelsinkiWave';
import BodyText from '../BodyText/BodyText';
import { POINT_TYPES } from '../../App';
import styled from 'styled-components';

const BackgroundShade = styled.div`
  position: relative;
  background-color: ${props => props.theme.colors.lightGray};
  min-height: 16.5rem;
  width: 100%;
`;
const SliderContainer = styled.div`
  position: relative;
  bottom: 3.5rem;
  min-height: 16.5rem;
  width: 100%;
  padding: 0 2rem;
`;

// these are just placeholder for now
const PROMOTION_POINT_NAMES = [
  'Skipperi - Otsolahden Satama',
  'Finfly - Vetovarjo',
  'TwentyKnots Helsinki',
];

const PROMOTION_TYPES = ['cityboat', 'sup', 'visitor'];

// these are just placeholders, correct content will be added to translation file
const PROMOTION_TYPES_CONTENT = {
  cityboat: {
    fi: {
      name: 'Skipperi',
      header: 'Seikkaile saaristossa Skipperin kaupunkiveneellä',
    },
    en: {
      name: 'Skipperi',
      header: 'Take a ride with a Skipperi city boat',
    },
    imageId: '8',
  },
  sup: {
    fi: {
      name: 'Kikkapakka',
      header: 'Kokeile suppailua Kikkapakan suppilaudoilla',
    },
    en: {
      name: 'Kikkapakka',
      header: 'Try out sup boarding with Kikkapakka',
    },
    imageId: '9',
  },
  visitor: {
    fi: {
      name: 'Vierasvenepaikat',
      header: 'Löydä vierasvenepaikkoja Helsingistä',
    },
    en: {
      name: 'Visitor harbors',
      header: 'Discover visitor harbors in Helsinki',
    },
    imageId: '10',
  },
};

const PROMOTION_ISLANDS = [
  'Vasikkasaari',
  'Lonna',
  'Kaunissaari',
  'Käärmeluodot',
  'Pihlajasaaret',
];

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

const typePromotionSliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  centerMode: true,
  centerPadding: '18px',
  slidesToScroll: 1,
  adaptiveHeight: true,
};

const pointPromotionSliderSettings = {
  dots: false,
  infinite: true,
  centerMode: true,
  centerPadding: '60px',
  speed: 500,
  adaptiveHeight: true,
};

export default () => {
  const { t, i18n } = useTranslation();
  const contextGeoData = useContext(GlobalGeoContext);
  const contextIslandData = useContext(GlobalIslandContext);

  const promotionPoints = [...contextGeoData]
    .filter(point => PROMOTION_POINT_NAMES.includes(point.properties.fi.name))
    // this shuffles the points
    .sort(() => 0.5 - Math.random());
  const promotionIslands = [...contextIslandData].filter(island =>
    PROMOTION_ISLANDS.includes(island.properties.fi.name)
  );

  const promotionIsland =
    promotionIslands[Math.floor(Math.random() * promotionIslands.length)];

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
      {PROMOTION_TYPES && (
        <PromotionSlideSection>
          <BackgroundShade>
            <SliderContainer>
              <Slider {...typePromotionSliderSettings}>
                {PROMOTION_TYPES.map((type, id) => (
                  <PromotionBlock
                    key={id}
                    withImage="true"
                    imageURL={`/images/${PROMOTION_TYPES_CONTENT[type].imageId}.jpeg`}
                  >
                    <BodyText>
                      {PROMOTION_TYPES_CONTENT[type][i18n.language].name}
                    </BodyText>
                    <SecondaryTitle>
                      {PROMOTION_TYPES_CONTENT[type][i18n.language].header}
                    </SecondaryTitle>
                    <LinkBox to={`/map?type=${type}`} variant="white">
                      {t('home.section2_button')}
                    </LinkBox>
                  </PromotionBlock>
                ))}
              </Slider>
            </SliderContainer>
          </BackgroundShade>
          <HelsinkiWave />
        </PromotionSlideSection>
      )}
      {promotionIsland && (
        <React.Fragment>
          <Section
            withImage="true"
            widthShadow="true"
            imageURL={
              promotionIsland.properties.image ||
              (promotionIsland.properties.imageId &&
                `/images/${promotionIsland.properties.imageId}.jpeg`)
            }
          >
            <SecondaryTitle>
              {promotionIsland.properties[i18n.language].name}
            </SecondaryTitle>
            <BodyText>
              {promotionIsland.properties[i18n.language].header}
            </BodyText>
            <LinkBox
              variant="white"
              to={`/map?island=${promotionIsland.properties.fi.name}`}
            >
              {t('home.section2_button')}
            </LinkBox>
          </Section>
          <HelsinkiWave />
        </React.Fragment>
      )}
      <Section>
        <SecondaryTitle>{t('home.section4_header')}</SecondaryTitle>
        <Slider {...pointPromotionSliderSettings}>
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

      <Section
        withImage="true"
        widthShadow="true"
        imageURL="https://images.unsplash.com/photo-1507911618740-de629a41dd34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
      >
        <SecondaryTitle>{t('home.section5_header')}</SecondaryTitle>
        <BodyText>{t('home.section5_subheader')}</BodyText>
        <LinkBox to="/map?type=visitor" variant="white">
          {t('home.section5_button')}
        </LinkBox>
      </Section>
      <Footer />
    </React.Fragment>
  );
};
