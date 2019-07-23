import styled from 'styled-components';

const Menu = styled.nav`
  z-index: 1337;
  position: absolute;
  position: fixed;
  box-sizing: border-box;
  max-width: 474px;
  width: 100%;
  height: 8vh;
  padding: 2rem 1.75rem;
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.menuShadow};

  .mainTitle {
    height: 100%;
    font-size: 2rem;
    display: block;
    color: ${props => props.theme.colors.black};
  }

  button {
    display: block;
    float: right;
  }
`;

export default Menu;
