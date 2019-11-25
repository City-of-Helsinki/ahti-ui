import React from 'react';
import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';
import BodyText from '../BodyText/BodyText';
import BaseButton from '../BaseButton/BaseButton';
import UnstyledLink from '../UnstyledLink/UnstyledLink';
import { ReactComponent as Menu } from '../../assets/icons/menu.svg';
import { ReactComponent as Exit } from '../../assets/icons/exit.svg';
import POINT_TYPES from '../../data/pointTypes.json';

import styled, { keyframes } from 'styled-components';

interface LanguageButtonProps {
  readonly isActive: boolean;
}

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

interface BackDropProp {
  readonly isOpen: boolean;
}

const BackDrop = styled.div<BackDropProp>`
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

const LanguageButton = styled(BaseButton)<LanguageButtonProps>`
  padding: 1rem;
  font-size: 1.4rem;
  font-weight: ${props => (props.isActive ? 600 : 400)};
`;

interface MenuButtonProp {
  readonly isOpen: boolean;
}

const MenuButton = styled(BaseButton)<MenuButtonProp>`
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

interface ClickFn {
  (event: React.MouseEvent<HTMLButtonElement>): void;
}

const DropdownMenu = ({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: ClickFn;
  onClose: ClickFn;
}) => {
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
              to={t('dropdown.give_feedback_target')}
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
              to={t('dropdown.add_location_target')}
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
                  onClick={() => (isOpen ? onClose : onOpen)}
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
