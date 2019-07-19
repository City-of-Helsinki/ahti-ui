import React from 'react';
import { Link } from 'react-router-dom';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';

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

  p {
    font-size: 1.3rem;
    line-height: 1.2;
    max-width: 80%;
    margin-top: -1rem;
  }
`;

export default ({ point, query, _onClick }) => {
  return (
    <Link
      to={{
        pathname: '/map',
        search: query,
      }}
      onClick={_onClick}
    >
      <Container imageURL="https://images.unsplash.com/photo-1536420124982-bd9d18fc47ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80">
        <SecondaryTitle>{point.properties.fi.name}</SecondaryTitle>
      </Container>
    </Link>
  );
};
