import React, { memo } from 'react';
import { LazyImage } from 'react-lazy-images';
import { useTranslation } from 'react-i18next';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import BackButton from '../BackButton/BackButton';
import CloseCardButton from '../CloseCardButton/CloseCardButton';
import BodyText from '../BodyText/BodyText';
import CardImageContainer from '../CardImageContainer/CardImageContainer';
import CardTextContainer from '../CardTextContainer/CardTextContainer';
import HelsinkiWave from '../HelsinkiWave/HelsinkiWave';
import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { ReactComponent as Location } from '../../assets/icons/location.svg';

import styled from 'styled-components';

const Container = styled.div`
  z-index: 1399;
  box-sizing: border-box;
  height: 60vh;
  top: 40vh;
  position: absolute;
  width: 100%;
  background-color: ${props => props.theme.colors.white};
`;

const ContactInfoContainer = styled.div`
  margin-top: 3rem;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  word-break: break-all;

  svg {
    margin-right: 1rem;
    min-width: 2rem;
  }
`;

const Line = styled.hr`
  margin: 1rem 0;
  border-color: ${props => props.theme.colors.black};
`;

const FreeTextContainer = styled.div`
  min-height: 7rem;
  overflow:auto; 
  width: 100%;
  margin-top: -3.5rem;
  position: relative;
  z-index 1401;
`;

const FloatingBlock = styled.div`
  background: ${props => props.theme.colors.lightGray};
  width: 21rem;
  margin-right: 1rem;
  height: 100%;
  float: right;
  padding: 1rem;
`;

const MapCard = ({ pointData, onBack, closeCardLink }) => {
  const { t, i18n } = useTranslation();
  const website =
    (pointData && pointData.properties.website) || '<placeholder site>';
  const info =
    (pointData && pointData.properties.phone_number) || '<placeholder #>';
  const address =
    (pointData && pointData.properties.address) || '<placeholder address>';
  const imageURL =
    pointData &&
    (pointData.properties.image ||
      (pointData.properties.imageId &&
        `/images/${pointData.properties.imageId}.jpeg`));
  return (
    (pointData && (
      <React.Fragment>
        <Container>
          <BackButton onBack={onBack} />
          <CloseCardButton closeCardLink={closeCardLink} />
          <LazyImage
            src={imageURL}
            placeholder={({ ref }) => (
              <CardImageContainer ref={ref}>
                {pointData.properties[i18n.language].name && (
                  <BodyText>
                    {pointData.properties[i18n.language].name}
                  </BodyText>
                )}
                {pointData.properties[i18n.language].header && (
                  <SecondaryTitle>
                    {pointData.properties[i18n.language].header}
                  </SecondaryTitle>
                )}
              </CardImageContainer>
            )}
            actual={() => (
              <CardImageContainer imageURL={imageURL}>
                {pointData.properties[i18n.language].name && (
                  <BodyText>
                    {pointData.properties[i18n.language].name}
                  </BodyText>
                )}
                {pointData.properties[i18n.language].header && (
                  <SecondaryTitle>
                    {pointData.properties[i18n.language].header}
                  </SecondaryTitle>
                )}
              </CardImageContainer>
            )}
          />
          <HelsinkiWave />

          {pointData.properties[i18n.language].free_text_1 && (
            <FreeTextContainer>
              <FloatingBlock>
                <BodyText>
                  {pointData.properties[i18n.language].free_text_1}
                </BodyText>
                <Line />
                <BodyText>
                  {pointData.properties[i18n.language].free_text_2}
                </BodyText>
              </FloatingBlock>
            </FreeTextContainer>
          )}
          <CardTextContainer>
            {pointData.properties[i18n.language].description && (
              <BodyText>
                {pointData.properties[i18n.language].description}
              </BodyText>
            )}
            <ContactInfoContainer>
              <IconContainer>
                <Location height="24" viewBox="0 0 48 48" />
                <BodyText>{address}</BodyText>
              </IconContainer>
              <Line />
              <a target="_blank" rel="noopener noreferrer" href={website}>
                <IconContainer>
                  <Home height="24" viewBox="0 0 48 48" />
                  <BodyText>{website}</BodyText>
                </IconContainer>
              </a>
              <Line />
              <IconContainer>
                <Info height="24" viewBox="0 0 48 48" />
                <BodyText>{info}</BodyText>
              </IconContainer>
            </ContactInfoContainer>
          </CardTextContainer>
        </Container>
      </React.Fragment>
    )) ||
    ''
  );
};

// TODO: get rid of react memeo as soon as we optimize the map page component
export default memo(MapCard);
