import React from 'react';
import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';
import BodyText from '../BodyText/BodyText';
import BaseButton from '../BaseButton/BaseButton';
import UnstyledLink from '../UnstyledLink/UnstyledLink';
import { ReactComponent as Menu } from '../../assets/icons/menu.svg';
import { ReactComponent as Exit } from '../../assets/icons/exit.svg';
import { POINT_TYPES } from '../../domain/app/App';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Body = styled.div`
  background-color: ${props => props.theme.colors.white};
  min-height: 80vh;
  max-height: 90vh;
  width: 100%;
  padding-top: 1rem;
  overflow-x: hidden;
  ${BodyText} {
    margin: 0.5rem 0;
    color: ${props => props.theme.colors.black};
  }
`;

const TextSection = styled.div`
  padding: 1rem 2rem;
`;

const Line = styled.hr`
  margin: 0;
`;

const BackDrop = styled.div`
  display: ${props => !props.isOpen && 'none'};
  /* Play the animation when the display changes from none to initial */
  animation: ${fadeIn} 0.4s ease-in-out;
  position: absolute;
  height: 100vh;
  width: 100%;
  z-index: 4999;
  background-color: rgb(0, 0, 0, 0.3);
`;

const LanguageButtonContainer = styled.div`
  padding-top: 1rem;
  padding-left: 1.5rem;
`;

const LanguageButton = styled(BaseButton)`
  padding: 1rem;
  font-size: 1.4rem;
  font-weight: ${props => (props.isActive ? 600 : 400)};
`;

const MenuButton = styled(BaseButton)`
  z-index: 5001;
  position: absolute;
  top: 1rem;
  right: 2rem;
  background-color: ${props => props.theme.colors.white};
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  /* Hide the box shadow when on top of the menu */
  box-shadow: ${props =>
    !props.isOpen && '2px 4px 8px 2px rgba(0, 0, 0, 0.15)'};
  &:focus {
    outline: 4px solid transparent;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.4);
  }
`;

const TrackedOutboundLink = styled(ReactGA.OutboundLink)`
  text-decoration: none;
`;

const DropdownMenu = ({ isOpen, onOpen, onClose }) => {
  const { t, i18n } = useTranslation();

  return (
    <React.Fragment>
      <MenuButton
        isOpen={isOpen}
        onClick={isOpen ? onClose : onOpen}
        aria-expanded={isOpen}
        aria-label={t('dropdown.label')}
      >
        {isOpen ? <Exit /> : <Menu />}
      </MenuButton>
      <BackDrop isOpen={isOpen}>
        <Body>
          <LanguageButtonContainer>
            <LanguageButton
              onClick={() => i18n.changeLanguage('fi')}
              isActive={i18n.language === 'fi'}
            >
              fi
            </LanguageButton>
            <LanguageButton
              onClick={() => i18n.changeLanguage('en')}
              isActive={i18n.language === 'en'}
            >
              en
            </LanguageButton>
          </LanguageButtonContainer>
          <TextSection>
            <TrackedOutboundLink
              eventLabel="give_feedback"
              target="_blank"
              rel="noopener noreferrer"
              to={
                i18n.language === 'fi'
                  ? 'https://docs.google.com/forms/d/e/1FAIpQLSegIqAsxVscFnk2iPneXahSpV1cnGjXZ2d_98fSSh0ZOsA1JA/viewform?usp=sf_link'
                  : 'https://docs.google.com/forms/d/e/1FAIpQLSefN-qtj9EOpV6iLcaKj2LrQYV-fhjEAeqB4g1rQPIdSIYLdA/viewform?usp=sf_link'
              }
            >
              <BodyText>{t('dropdown.give_feedback')}</BodyText>
            </TrackedOutboundLink>
          </TextSection>
          <Line />
          <TextSection>
            <TrackedOutboundLink
              eventLabel="add_location"
              target="_blank"
              rel="noopener noreferrer"
              to={
                i18n.language === 'fi'
                  ? 'https://docs.google.com/forms/d/e/1FAIpQLSe6xJj1vpjNfinde6Ly3jv_BG7Reev0KGAKH8O7QPsIVn3IUg/viewform?usp=sf_link'
                  : 'https://docs.google.com/forms/d/e/1FAIpQLSeUKV9KPXBjDZHNRnVi3vB1N-fayYxFy3tirFdKplAIFYqxRw/viewform?usp=sf_link'
              }
            >
              <BodyText>{t('dropdown.add_location')}</BodyText>
            </TrackedOutboundLink>
          </TextSection>
          <Line />
          <TextSection>
            {POINT_TYPES &&
              POINT_TYPES.map((type, id) => (
                <UnstyledLink
                  to={`/map?type=${type}`}
                  key={id}
                  onClick={isOpen ? onClose : onOpen}
                >
                  <BodyText>{t(`types.${type}`)}</BodyText>
                </UnstyledLink>
              ))}
          </TextSection>
          <Line />
          <TextSection>
            <TrackedOutboundLink
              eventLabel="boat_page"
              target="_blank"
              rel="noopener noreferrer"
              to={t('dropdown.boat_page_target')}
            >
              <BodyText>{t('dropdown.boat_page')}</BodyText>
            </TrackedOutboundLink>
            <TrackedOutboundLink
              eventLabel="rescue_directions"
              target="_blank"
              rel="noopener noreferrer"
              to={t('dropdown.rescue_directions_target')}
            >
              <BodyText>{t('dropdown.rescue_directions')}</BodyText>
            </TrackedOutboundLink>
          </TextSection>
        </Body>
      </BackDrop>
    </React.Fragment>
  );
};

export default DropdownMenu;
