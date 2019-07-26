import React, { memo } from 'react';
import { LazyImage } from 'react-lazy-images';
import styled from 'styled-components';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import TypeTitle from '../TypeTitle/TypeTitle';
import UnstyledLink from '../UnstyledLink/UnstyledLink';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 8rem;
  padding: 2.5rem 2.2rem;

  background-image: url(${props => props.imageURL || null});
  background-color: ${props => props.theme.colors.lightGray};
  background-repeat: no-repeat;
  background-size: cover;

  box-shadow: ${props =>
    props.imageURL ? `inset 0px 28rem 28rem -28rem rgba(0,0,0,0.5)` : null};

  color: ${props => props.theme.colors.white};

  .slick-slider {
    margin-right: -2rem;
  }

  /* Enhance to a larger card size on taller screens */
  @media screen and (min-height: 32rem) {
    & {
      height: 16rem;
    }
  }
`;

const SliderCard = ({ point, query }) => {
  const imageURL = `/images/${point.properties.imageId}.jpeg`;
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
            <SecondaryTitle>{point.properties.fi.name}</SecondaryTitle>
            <TypeTitle>{point.properties.type}</TypeTitle>
          </Container>
        )}
        actual={() => (
          <Container imageURL={imageURL}>
            <SecondaryTitle>{point.properties.fi.name}</SecondaryTitle>
            <TypeTitle>{point.properties.type}</TypeTitle>
          </Container>
        )}
      />
    </UnstyledLink>
  );
};

export default memo(SliderCard);
