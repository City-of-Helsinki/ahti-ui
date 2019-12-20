import React, { memo } from 'react';
import ReactGA from 'react-ga';
import CloseCardButton from '../CloseCardButton/CloseCardButton';
import BodyText from '../BodyText/BodyText';
import CardTextContainer from '../CardTextContainer/CardTextContainer';
import HelsinkiWave from '../HelsinkiWave/HelsinkiWave';
import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { ReactComponent as Location } from '../../assets/icons/location.svg';
import CardImageContainer from './CardImageContainer';

import styled from 'styled-components';
import { useWindowSize } from '../../common/utils/hooks';

interface ContainerProps {
  readonly mobile: boolean;
}

const Container = styled.div<ContainerProps>`
  z-index: 1399;
  box-sizing: border-box;
  height: ${props => (props.mobile ? '60vh' : 'unset')};
  bottom: ${props => (props.mobile ? 'unset' : '1rem')};
  left: ${props => (props.mobile ? 'unset' : '1rem')};
  top: ${props => (props.mobile ? '40vh' : '9.5rem')};
  position: absolute;
  width: ${props => (props.mobile ? '100%' : '30rem')};
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

const DescriptionContainer = styled.div`
  max-height: 300px;
  overflow: scroll;
`;

const MapCard = ({
  pointData,
  onBack,
  closeCardLink,
}: {
  pointData: any;
  onBack: any;
  closeCardLink: any;
}) => {
  const size = useWindowSize();

  const website = pointData && pointData.properties.url;
  const info = pointData && pointData.properties.phone_number;
  const address = pointData && pointData.properties.address;
  return (
    (pointData && (
      <React.Fragment>
        <Container mobile={size.width < 1200}>
          <CloseCardButton closeCardLink={closeCardLink} />
          <CardImageContainer data={pointData.properties} />
          <HelsinkiWave />

          {pointData.properties.free_text_1 && (
            <FreeTextContainer>
              <FloatingBlock>
                <BodyText>{pointData.properties.free_text_1}</BodyText>
                {pointData.properties.free_text_2 && (
                  <React.Fragment>
                    <Line />
                    <BodyText>{pointData.properties.free_text_2}</BodyText>
                  </React.Fragment>
                )}
              </FloatingBlock>
            </FreeTextContainer>
          )}
          <CardTextContainer>
            {pointData.properties.description && (
              <DescriptionContainer>
                <BodyText>{pointData.properties.description}</BodyText>
              </DescriptionContainer>
            )}
            <ContactInfoContainer>
              {address && (
                <IconContainer>
                  <Location height="24" viewBox="0 0 48 48" />
                  <BodyText>{address}</BodyText>
                </IconContainer>
              )}
              {website && (
                <React.Fragment>
                  <Line />
                  <ReactGA.OutboundLink
                    eventLabel={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    to={website}
                  >
                    <IconContainer>
                      <Home height="24" viewBox="0 0 48 48" />
                      <BodyText>{website}</BodyText>
                    </IconContainer>
                  </ReactGA.OutboundLink>
                </React.Fragment>
              )}
              {info && (
                <React.Fragment>
                  <Line />
                  <IconContainer>
                    <Info height="24" viewBox="0 0 48 48" />
                    <BodyText>{info}</BodyText>
                  </IconContainer>
                </React.Fragment>
              )}
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
