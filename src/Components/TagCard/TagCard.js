import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { LazyImage } from 'react-lazy-images';
import queryString from 'query-string';
import { ReactComponent as LocationIcon } from '../../assets/icons/location_white.svg';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import TypeTitle from '../TypeTitle/TypeTitle';
import BodyText from '../BodyText/BodyText';
import BackButton from '../BackButton/BackButton';
import CardImageContainer from '../CardImageContainer/CardImageContainer';
import CardTextContainerBase from '../CardTextContainer/CardTextContainer';
import HelsinkiWave from '../HelsinkiWave/HelsinkiWave';

import styled from 'styled-components';

const Container = styled.div`
  z-index: 10;
  box-sizing: border-box;
  margin-top: 40vh;
  position: relative;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
`;

const CardTextContainer = styled(CardTextContainerBase)`
  p {
    margin-top: -1rem;
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
`;

const TagCard = ({ pointData, tagData, location, onBack }) => {
  const imageURL = `/images/${tagData[0].properties.imageId}.jpeg`;
  return (
    tagData.length > 0 && (
      <div>
        <BackButton onBack={onBack} />
        <Container>
          <LazyImage
            src={imageURL}
            placeholder={({ ref }) => (
              <CardImageContainer ref={ref}>
                {tagData[0].properties.fi.name && (
                  <SecondaryTitle>
                    {tagData[0].properties.fi.name}
                  </SecondaryTitle>
                )}
                {tagData[0].properties.fi.description && (
                  <BodyText>
                    {tagData[0].properties.fi.description.slice(0, 100)}
                  </BodyText>
                )}
                <LocationContainer>
                  <Location viewBox="0 0 48 48" height="24" />
                  <BodyText>{pointData.length} locations</BodyText>
                </LocationContainer>
              </CardImageContainer>
            )}
            actual={() => (
              <CardImageContainer imageURL={imageURL}>
                {tagData[0].properties.fi.name && (
                  <SecondaryTitle>
                    {tagData[0].properties.fi.name}
                  </SecondaryTitle>
                )}
                {tagData[0].properties.fi.description && (
                  <BodyText>
                    {tagData[0].properties.fi.description.slice(0, 100)}
                  </BodyText>
                )}
                <LocationContainer>
                  <Location viewBox="0 0 48 48" height="24" />
                  <BodyText>{pointData.length} locations</BodyText>
                </LocationContainer>
              </CardImageContainer>
            )}
          />
          <HelsinkiWave />
          <CardTextContainer>
            <SecondaryTitle>Things to do</SecondaryTitle>
            <BodyText>
              Locations available for travellers in{' '}
              {tagData[0].properties.fi.name}
            </BodyText>
            <TagListContainer>
              {pointData.length > 0 &&
                pointData.map((point, id) => {
                  const query =
                    point.properties.type === 'island'
                      ? queryString.stringify({
                          tag: point.properties.fi.name,
                        })
                      : queryString.stringify({
                          ...queryString.parse(location.search),
                          name: point.properties.fi.name,
                        });
                  const imageURL = `/images/${point.properties.imageId}.jpeg`;

                  return (
                    <Link
                      to={{
                        pathname: '/map',
                        search: query,
                      }}
                      key={id}
                    >
                      <LazyImage
                        src={imageURL}
                        placeholder={({ ref }) => (
                          <TagListItem ref={ref}>
                            <SecondaryTitle>
                              {point.properties.fi.name}
                            </SecondaryTitle>
                            <TypeTitle>{point.properties.type}</TypeTitle>
                          </TagListItem>
                        )}
                        actual={() => (
                          <TagListItem imageURL={imageURL}>
                            <SecondaryTitle>
                              {point.properties.fi.name}
                            </SecondaryTitle>
                            <TypeTitle>{point.properties.type}</TypeTitle>
                          </TagListItem>
                        )}
                      />
                    </Link>
                  );
                })}
            </TagListContainer>
          </CardTextContainer>
        </Container>
      </div>
    )
  );
};
// TODO: get rid of react memeo as soon as we optimize the map page component

export default memo(TagCard);
