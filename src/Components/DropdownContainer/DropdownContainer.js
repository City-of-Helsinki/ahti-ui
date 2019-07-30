import React, { useState } from 'react';
import { ReactComponent as AhtiLogo } from '../../assets/icons/ahti_logo.svg';
import DropdownMenu from '../Dropdown/Dropdown';
import UnstyledLink from '../UnstyledLink/UnstyledLink';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

const TitleContainer = styled.div`
  z-index: 2000;
  position: absolute;
  top: 1rem;
  left: 1rem;

  background-color: ${props => props.theme.colors.white};
  box-shadow: 2px 4px 8px 2px rgba(0, 0, 0, 0.15);
  border-radius: 30% / 50%;
  padding: 1.5rem;
`;

// TODO: Rename to Navigation
const DropdownContainer = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();
  return (
    <nav>
      <UnstyledLink to="/">
        <TitleContainer>
          <AhtiLogo />
        </TitleContainer>
      </UnstyledLink>
      <DropdownMenu
        isOpen={menuOpen}
        onOpen={() => {
          document.body.style.overflowY = 'hidden';
          setMenuOpen(true);
        }}
        onClose={() => {
          document.body.style.overflowY = 'scroll';
          setMenuOpen(false);
        }}
        onLanguageFI={() => i18n.changeLanguage('fi')}
        onLanguageEN={() => i18n.changeLanguage('en')}
      />
    </nav>
  );
};

export default DropdownContainer;
