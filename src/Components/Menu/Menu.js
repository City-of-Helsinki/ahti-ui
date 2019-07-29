import styled from 'styled-components';

const Menu = styled.nav`
  display: flex;

  position: absolute;
  z-index: 2000;
  margin-top: 1rem;
  max-width: 474px;
  width: 100%;
  padding-left: 1.75rem;
  padding-right: 1.75rem;

  justify-content: space-between;
  align-items: center;

  .mainTitle {
    margin: 0 auto;
    font-size: 2rem;
  }

  .mainTitle > a {
    text-decoration: none;
    color: ${props => props.theme.colors.black};
  }
`;

export default Menu;
