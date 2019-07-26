import styled from 'styled-components';

const CardImageContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-height: 16rem;
  height: 30vh;
  padding: 2.5rem 2.2rem;

  background-image: url(${props => props.imageURL || null});
  background-color: ${props => props.theme.colors.lightGray};
  background-repeat: no-repeat;
  background-size: cover;

  box-shadow: ${props =>
    props.imageURL ? `inset 4rem 7rem 21rem 0.5rem rgba(0,0,0,0.75)` : null};

  color: ${props => props.theme.colors.white};

  p {
    margin-top: -1rem;
  }
`;
export default CardImageContainer;
