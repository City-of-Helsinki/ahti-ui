import styled from 'styled-components';

const Section = styled.section`
  box-sizing: border-box;
  width: 100%;
  min-height: 28rem;

  padding: 4rem 2rem;

  background-color: ${props => props.theme.colors.white};

  background-image: url(${props => (props.withImage ? props.imageURL : null)});
  background-repeat: no-repeat;
  background-size: cover;

  color: ${props =>
    props.withImage ? props.theme.colors.white : props.theme.colors.black};
  .slick-slider {
    margin-right: -2rem;
  }

  p {
    font-size: 1.3rem;
    line-height: 1.2;
    max-width: 80%;
    margin-top: -1rem;
  }

  button {
    margin-top: 1rem;
  }
`;

export default Section;
