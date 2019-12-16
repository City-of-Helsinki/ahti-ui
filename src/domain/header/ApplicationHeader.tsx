import React, { useState } from 'react';
import { ReactComponent as AhtiLogo } from '../../assets/icons/ahti_logo.svg';
import DropdownMenu from '../../Components/DropdownMenu/DropdownMenu';
import UnstyledLink from '../../Components/UnstyledLink/UnstyledLink';

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
const ApplicationHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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
      />
    </nav>
  );
};

export default ApplicationHeader;
