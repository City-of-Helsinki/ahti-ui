import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import LinkBox from '../../Components/LinkBox/LinkBox';
import MapOverlay from '../../Components/MapOverlay/MapOverlay';
import Footer from '../footer/Footer';
import SecondaryTitle from '../../Components/SecondaryTitle/SecondaryTitle';
import Section from '../../Components/Section/Section';
import RoundBoxWithText from '../../Components/RoundBox/RoundBox';
import TertiaryTitle from '../../Components/TertiaryTitle/TertiaryTitle';
import UnstyledLink from '../../Components/UnstyledLink/UnstyledLink';
import VerticalBlock from '../../Components/VerticalBlock/VerticalBlock';
import BodyText from '../../Components/BodyText/BodyText';
import HelsinkiWave from '../../Components/HelsinkiWave/HelsinkiWave';
import { useQuery } from '@apollo/react-hooks';
import {
  FEATURES,
  FEATURES_features_edges_node_properties,
} from '../api/generatedTypes/FEATURES';
import FEATURES_QUERY from '../../Components/MapPage/queries/featuresQuery';

const POINT_TYPES = ['myhelsinki'];

const removeTouchMoveEventFromWindow = (e: { stopPropagation: () => void }) => {
  e.stopPropagation();
};

const addTouchMoveEvenetListernerToWindow = () => {
  window.addEventListener('touchmove', removeTouchMoveEventFromWindow, {
    passive: false,
  });
};

const removeTouchMoveEvenetListernerToWindow = () => {
  window.removeEventListener('touchmove', removeTouchMoveEventFromWindow, {});
};

const filterSliderSettings = {
  dots: false,
  swipeEvent: addTouchMoveEvenetListernerToWindow,
  afterChange: removeTouchMoveEvenetListernerToWindow,
  infinite: false,
  speed: 500,
  slidesToShow: 3.5,
  slidesToScroll: 3,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 390,
      settings: {
        slidesToShow: 3.5,
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

const pointPromotionSliderSettings = {
  dots: false,
  swipeEvent: addTouchMoveEvenetListernerToWindow,
  afterChange: removeTouchMoveEvenetListernerToWindow,
  infinite: true,
  centerMode: true,
  centerPadding: '60px',
  speed: 500,
  adaptiveHeight: true,
};

export default () => {
  const { t, i18n } = useTranslation();
  const { data } = useQuery<FEATURES>(FEATURES_QUERY);
  const [promotion, setPromotion] = useState<
    FEATURES_features_edges_node_properties
  >();
  const [promotions, setPromotions] = useState<
    FEATURES_features_edges_node_properties[]
  >();

  useEffect(() => {
    if (data && data.features && data.features.edges) {
      const promotionProperties = data.features.edges
        .filter(edge => edge)
        // @ts-ignore
        .map(edge => edge.node.properties);
      // @ts-ignore
      setPromotions(promotionProperties);
      // @ts-ignore
      setPromotion(promotionProperties[0]);
    }
  }, [data]);

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
      {promotion && (
        <React.Fragment>
          <Section
            withImage={true}
            widthShadow={true}
            imageURL={`/images/${promotion.imageId}.jpeg`}
          >
            <SecondaryTitle>{promotion.name}</SecondaryTitle>
            <BodyText>{promotion.header}</BodyText>
            <LinkBox variant="white" to={`/map?island=${promotion.name}`}>
              {t('home.section2_button')}
            </LinkBox>
          </Section>
          <HelsinkiWave />
        </React.Fragment>
      )}
      <Section>
        <SecondaryTitle>{t('home.section4_header')}</SecondaryTitle>
        <Slider {...pointPromotionSliderSettings}>
          {promotions &&
            promotions.map((point: any, id: any) => {
              return (
                <UnstyledLink to={`/map?name=${point.name}` || '/map'} key={id}>
                  <VerticalBlock
                    withImage={true}
                    imageURL={`/images/${point.imageId}.jpeg`}
                  >
                    <SecondaryTitle>{point.name}</SecondaryTitle>
                  </VerticalBlock>
                </UnstyledLink>
              );
            })}
        </Slider>
      </Section>

      <Section
        withImage={true}
        widthShadow={true}
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
