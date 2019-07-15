import styled from 'styled-components';

const Menu = styled.nav`
  box-sizing: border-box;
  width: 100%;
  height: 5rem;
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
