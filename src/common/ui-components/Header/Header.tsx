import React from 'react';
// import { ReactComponent as AhtiLogo } from '../../assets/icons/ahti_logo.svg';
// import DropdownMenu from '../../Components/DropdownMenu/DropdownMenu';
// import UnstyledLink from '../../Components/UnstyledLink/UnstyledLink';

// import styled from 'styled-components';

const ApplicationHeader = () => {
  //   const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      Header
      {/* <UnstyledLink to="/">
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
      /> */}
    </nav>
  );
};

export default ApplicationHeader;
