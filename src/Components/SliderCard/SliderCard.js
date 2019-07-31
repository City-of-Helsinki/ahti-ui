import React, { memo } from 'react';
import { LazyImage } from 'react-lazy-images';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import BodyText from '../BodyText/BodyText';
import TypeTitle from '../TypeTitle/TypeTitle';
import UnstyledLink from '../UnstyledLink/UnstyledLink';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 8rem;
  padding: 1.5rem 2rem;

  background-image: url(${props => props.imageURL || null});
  background-color: ${props => props.theme.colors.lightGray};
  background-repeat: no-repeat;
  background-size: cover;

  box-shadow: ${props =>
    props.imageURL ? `inset 4rem 7rem 21rem 0.5rem rgba(0,0,0,0.75)` : null};

  color: ${props => props.theme.colors.white};

  .slick-slider {
    margin-right: -2rem;
  }

  ${SecondaryTitle} {
    margin-top: 0.7rem;
    max-width: 100%;
    font-size: 1.7rem;
  }

  /* Enhance to a larger card size on taller screens */
  @media screen and (min-height: 32rem) {
    & {
      height: 16rem;
    }
  }
`;

const SliderCard = ({ point, query }) => {
  const { t, i18n } = useTranslation();
  const imageURL =
    point.properties.imageId && `/images/${point.properties.imageId}.jpeg`;
  return (
    <UnstyledLink
      to={{
        pathname: '/map',
        search: query,
      }}
    >
      <LazyImage
        src={imageURL}
        placeholder={({ ref }) => (
          <Container ref={ref}>
            {point.properties.fi.name && (
              <BodyText>{point.properties.fi.name}</BodyText>
            )}
            {point.properties.fi.header && (
              <SecondaryTitle>{point.properties.fi.header}</SecondaryTitle>
            )}
            <TypeTitle>{t(`types.${point.properties.type}`)}</TypeTitle>
          </Container>
        )}
        actual={() => (
          <Container imageURL={imageURL}>
            {point.properties.fi.name && (
              <BodyText>{point.properties.fi.name}</BodyText>
            )}
            {point.properties.fi.header && (
              <SecondaryTitle>{point.properties.fi.header}</SecondaryTitle>
            )}
            <TypeTitle>{t(`types.${point.properties.type}`)}</TypeTitle>
          </Container>
        )}
      />
    </UnstyledLink>
  );
};

export default memo(SliderCard);
