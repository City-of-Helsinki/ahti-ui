import styled from 'styled-components';

const Menu = styled.nav`
  display: flex;

  position: absolute;
  z-index: 1337;

  /* NOTE: This height matters for overlapping the map  */
  height: 8vh;

  /* NOTE: This is the arbitrary max-width for wide screens */
  max-width: 474px;
  width: 100%;
  padding-left: 1.75rem;
  padding-right: 1.75rem;

  justify-content: space-between;
  align-items: center;

  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.menuShadow};

  .mainTitle {
    margin: 0;
    font-size: 2rem;
  }

  .mainTitle > a {
    text-decoration: none;
    color: ${props => props.theme.colors.black};
  }
`;

export default Menu;
