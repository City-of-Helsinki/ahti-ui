import Section from '../Section/Section';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import BodyText from '../BodyText/BodyText';

import styled from 'styled-components';

const PromotionSlideSection = styled(Section)`
  padding: 0;
  min-height: 21.5rem;

  ${SecondaryTitle} {
    font-size: 1.7rem;
    line-height: 1.4;
    width: 100%;
    margin: 0;
    margin-top: 1.5rem;
  }

  ${BodyText} {
    margin: 0;
    font-family: ${props => props.theme.fonts.fontFamilyBold};
  }
`;

export default PromotionSlideSection;
