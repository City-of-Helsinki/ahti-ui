import styled from 'styled-components';

const LinkBox = styled.div`
  box-sizing: border-box;

  /** Give the box content-width */
  display: inline-block;

  min-width: 13rem;
  max-width: 26rem;

  border: ${props => props.theme.borders.buttonBorder};
  border-color: ${props =>
    props.variant === 'white'
      ? props.theme.colors.white
      : props.theme.colors.black};
  color: ${props =>
    props.variant === 'white'
      ? props.theme.colors.white
      : props.theme.colors.black};
  background-color: ${props => props.theme.colors.transparent};

  padding: 1rem 2rem;
  font-family: ${props => props.theme.fonts.fontFamilyBold};
  font-size: 1.3rem;
  line-height: 1.3rem;

  text-align: center;
`;

export default LinkBox;
