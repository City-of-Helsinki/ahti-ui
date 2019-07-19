import React, { memo } from 'react';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as PhoneIcon } from '../../assets/icons/phone.svg';
import BackButton from '../BackButton/BackButton';

import styled from 'styled-components';

const Container = styled.div`
  z-index: 34058052930;
  box-sizing: border-box;
  height: 60vh;
  top: -60vh;
  margin-bottom: -63vh;
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
`;

const Header = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: 30vh;
  max-height: 30vh;
  padding: 2.5rem 2.2rem;

  background-image: url(${props => props.imageURL || null});
  background-repeat: no-repeat;
  background-size: cover;

  box-shadow: ${props =>
    props.imageURL ? `inset 4rem 7rem 21rem 0.5rem rgba(0,0,0,0.75)` : null};

  color: ${props =>
    props.imageURL ? props.theme.colors.white : props.theme.colors.black};

  p {
    font-size: 1.3rem;
    line-height: 1.2;
    max-width: 80%;
    margin-top: -1rem;
  }
`;

const Body = styled.div`
  box-sizing: border-box;
  padding: 2rem 2rem;
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
  color: ${props =>
    props.imageURL ? props.theme.colors.white : props.theme.colors.black};

  p {
    font-size: 1.3rem;
    line-height: 1.2;
    max-width: 80%;
  }

  a {
    display: flex;
    color: inherit;
    align-items: center;
  }
`;

const Home = styled(HomeIcon)`
  margin-right: 1rem;
`;

const Phone = styled(PhoneIcon)`
  margin-right: 1rem;
`;

const PhoneContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Line = styled.hr`
  margin: 1rem 0;
  border-color: ${props => props.theme.colors.black};
`;

const MapCard = ({ pointData, onBack }) => {
  const website = (pointData && pointData.properties.website) || 'huutista.fi';
  const phone =
    (pointData && pointData.properties.phone_number) || '050368109t';
  return (
    (pointData && (
      <React.Fragment>
        <BackButton onBack={onBack} />
        <Container>
          <Header imageURL="https://images.unsplash.com/photo-1536420124982-bd9d18fc47ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80">
            {pointData.properties.fi.name && (
              <SecondaryTitle>{pointData.properties.fi.name}</SecondaryTitle>
            )}
            {pointData.properties.fi.description && (
              <p>{pointData.properties.fi.description}</p>
            )}
          </Header>
          <Body>
            <a href={website}>
              <Home height="24" viewBox="0 0 48 48" />
              <p>{website}</p>
            </a>

            <Line />
            <PhoneContainer>
              <Phone height="24" viewBox="0 0 48 48" />
              <p>{phone}</p>
            </PhoneContainer>
          </Body>
        </Container>
      </React.Fragment>
    )) ||
    ''
  );
};

// TODO: get rid of react memeo as soon as we optimize the map page component
export default memo(MapCard);
