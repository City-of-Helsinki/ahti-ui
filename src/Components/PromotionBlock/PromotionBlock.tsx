import styled from 'styled-components';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';

interface PromotionBlockProps {
  readonly imageURL: string;
}

const PromotionBlock = styled.div<PromotionBlockProps>`
  background-image: url(${props => props.imageURL});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: inset 4rem 7rem 21rem 0.5rem rgba(0, 0, 0, 0.6);

  box-sizing: border-box;
  min-height: 16.5rem;
  width: 100%;
  padding: 1.5rem;

  ${SecondaryTitle} {
    max-width: 100%;
  }

  color: ${props => props.theme.colors.white};
`;

export default PromotionBlock;
