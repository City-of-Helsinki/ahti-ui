import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { LazyImage } from 'react-lazy-images';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import TypeTitle from '../TypeTitle/TypeTitle';

import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 18vh;
  max-height: 18vh;
  padding: 2.5rem 2.2rem;

  background-image: url(${props => props.imageURL || null});
  background-repeat: no-repeat;
  background-size: cover;

  box-shadow: ${props =>
    props.imageURL ? `inset 0px 28rem 28rem -28rem rgba(0,0,0,0.5)` : null};

  color: ${props =>
    props.imageURL ? props.theme.colors.white : props.theme.colors.black};
  .slick-slider {
    margin-right: -2rem;
  }
`;

const SliderCard = ({ point, query, _onClick }) => {
  return (
    <Link
      to={{
        pathname: '/map',
        search: query,
      }}
      onClick={_onClick}
    >
      <LazyImage
        src={`/images/${point.properties.imageId}.jpeg`}
        placeholder={({ ref }) => (
          <Container ref={ref}>
            <SecondaryTitle>{point.properties.fi.name}</SecondaryTitle>
            <TypeTitle>{point.properties.type}</TypeTitle>
          </Container>
        )}
        actual={() => (
          <Container imageURL={`/images/${point.properties.imageId}.jpeg`}>
            <SecondaryTitle>{point.properties.fi.name}</SecondaryTitle>
            <TypeTitle>{point.properties.type}</TypeTitle>
          </Container>
        )}
      />
    </Link>
  );
};

export default memo(SliderCard);
