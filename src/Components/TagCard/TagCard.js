import React, { memo } from 'react';
import { LazyImage } from 'react-lazy-images';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LocationIcon } from '../../assets/icons/location_white.svg';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import TypeTitle from '../TypeTitle/TypeTitle';
import BodyText from '../BodyText/BodyText';
import BackButton from '../BackButton/BackButton';
import CardImageContainer from '../CardImageContainer/CardImageContainer';
import UnstyledLink from '../UnstyledLink/UnstyledLink';
import CardTextContainer from '../CardTextContainer/CardTextContainer';
import HelsinkiWave from '../HelsinkiWave/HelsinkiWave';
import { getPointQuery } from '../../utils';

import styled from 'styled-components';

const Container = styled.div`
  z-index: 10;
  box-sizing: border-box;
  top: 40vh;
  position: absolute;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
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

const TagListContainer = styled.div`
  margin-top: 2rem;

  h2 {
    margin-bottom: 1rem;
  }
`;

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
  const { t, i18n } = useTranslation();
  const imageURL = tagData && `/images/${tagData.properties.imageId}.jpeg`;
  return (
    tagData && (
      <div>
        <BackButton onBack={onBack} />
        <Container>
          <LazyImage
            src={imageURL}
            placeholder={({ ref }) => (
              <CardImageContainer ref={ref}>
                {tagData.properties.fi.name && (
                  <BodyText>{tagData.properties.fi.name}</BodyText>
                )}
                {tagData.properties.fi.header && (
                  <SecondaryTitle>
                    {tagData.properties.fi.header}
                  </SecondaryTitle>
                )}
                <LocationContainer>
                  <Location viewBox="0 0 48 48" height="24" />
                  <BodyText>
                    {pointData.length} {t('map.tag_card.locations')}
                  </BodyText>
                </LocationContainer>
              </CardImageContainer>
            )}
            actual={() => (
              <CardImageContainer imageURL={imageURL}>
                {tagData.properties.fi.name && (
                  <BodyText>{tagData.properties.fi.name}</BodyText>
                )}
                {tagData.properties.fi.header && (
                  <SecondaryTitle>
                    {tagData.properties.fi.header}
                  </SecondaryTitle>
                )}
                <LocationContainer>
                  <Location viewBox="0 0 48 48" height="24" />
                  <BodyText>
                    {pointData.length} {t('map.tag_card.locations')}
                  </BodyText>
                </LocationContainer>
              </CardImageContainer>
            )}
          />
          <HelsinkiWave />
          <CardTextContainer>
            {tagData.properties.fi.description && (
              <BodyText>{tagData.properties.fi.description}</BodyText>
            )}

            <TagListContainer>
              <SecondaryTitle>
                {t('map.tag_card.point_list_header')}
              </SecondaryTitle>
              <BodyText>
                {t('map.tag_card.point_list_subheader')}{' '}
                {tagData.properties.fi.name}
              </BodyText>
              {pointData.length > 0 &&
                pointData.map((point, id) => {
                  const imageURL = `/images/${point.properties.imageId}.jpeg`;

                  return (
                    <UnstyledLink
                      to={{
                        pathname: '/map',
                        search: getPointQuery(
                          point,
                          queryString.parse(location.search)
                        ),
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
                            <TypeTitle>
                              {t(`types.${point.properties.type}`)}
                            </TypeTitle>
                          </TagListItem>
                        )}
                        actual={() => (
                          <TagListItem imageURL={imageURL}>
                            <SecondaryTitle>
                              {point.properties.fi.name}
                            </SecondaryTitle>
                            <TypeTitle>
                              {t(`types.${point.properties.type}`)}
                            </TypeTitle>
                          </TagListItem>
                        )}
                      />
                    </UnstyledLink>
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
