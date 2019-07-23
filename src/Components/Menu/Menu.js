import styled from 'styled-components';

const Menu = styled.nav`
  box-sizing: border-box;

  z-index: 1337;
  position: absolute;
  position: fixed;

  display: flex;

  /* NOTE: This is the arbitrary max-width for wide screens */
  max-width: 474px;

  /* NOTE: This height matters for overlapping the map  */
  min-height: 8vh;
  width: 100%;
  padding: 2rem 1.75rem;

  justify-content: space-between;
  align-items: center;

  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.menuShadow};

  .mainTitle {
    display: block;
    height: 100%;
    margin: 0;
    font-size: 2rem;
    color: ${props => props.theme.colors.black};
  }

  button {
    display: inline-block;
  }
`;

export default Menu;
