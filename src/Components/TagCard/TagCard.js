import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import { ReactComponent as LocationIcon } from '../../assets/icons/location_white.svg';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import TypeTitle from '../TypeTitle/TypeTitle';

import styled from 'styled-components';

const Container = styled.div`
  z-index: 34058052930;
  box-sizing: border-box;
  margin-top: 40vh;
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
    margin-top: -1rem;
  }

  a {
    display: flex;
    color: inherit;
    align-items: center;
  }
`;

const LocationContainer = styled.div`
  margin-top: 1rem;
  opacity: 0.6;
  display: flex;
  align-items: center;

  p {
    margin-top: 0;
  }
`;

const Location = styled(LocationIcon)`
  margin-right: 0.5rem;
`;

const TagListContainer = styled.ul``;

const TagListItem = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 15rem;
  max-height: 15rem;
  padding: 2.5rem 2.2rem;
  margin: 2rem 0;

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

const TagCard = ({ pointData, tagData, location }) =>
  pointData.length > 0 &&
  tagData.length > 0 && (
    <div>
      <Container>
        <Header imageURL="https://images.unsplash.com/photo-1536420124982-bd9d18fc47ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80">
          {tagData[0].properties.fi.name && (
            <SecondaryTitle>{tagData[0].properties.fi.name}</SecondaryTitle>
          )}
          {tagData[0].properties.fi.description && (
            <p>{tagData[0].properties.fi.description.slice(0, 100)}</p>
          )}
          <LocationContainer>
            <Location viewBox="0 0 48 48" height="24" />
            <p>{pointData.length} locations</p>
          </LocationContainer>
        </Header>
        <Body>
          <SecondaryTitle>Things to do</SecondaryTitle>
          <p>
            Locations available for travellers in{' '}
            {tagData[0].properties.fi.name}
          </p>
          <TagListContainer>
            {pointData.map((point, id) => {
              const query =
                point.properties.type === 'island'
                  ? queryString.stringify({
                      tag: point.properties.fi.name,
                    })
                  : queryString.stringify({
                      ...queryString.parse(location.search),
                      name: point.properties.fi.name,
                    });

              return (
                <Link
                  to={{
                    pathname: '/map',
                    search: query,
                  }}
                  key={id}
                >
                  <TagListItem imageURL="https://images.unsplash.com/photo-1536420124982-bd9d18fc47ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80">
                    <SecondaryTitle>{point.properties.fi.name}</SecondaryTitle>
                    <TypeTitle>{point.properties.type}</TypeTitle>
                  </TagListItem>
                </Link>
              );
            })}
          </TagListContainer>
        </Body>
      </Container>
    </div>
  );
// TODO: get rid of react memeo as soon as we optimize the map page component

export default memo(TagCard);
