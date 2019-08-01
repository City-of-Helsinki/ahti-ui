import React from 'react';
import { useTranslation } from 'react-i18next';
import SecondaryTitle from '../SecondaryTitle/SecondaryTitle';
import BodyText from '../BodyText/BodyText';
import UnstyledLink from '../UnstyledLink/UnstyledLink';
import HelsinkiWave from '../HelsinkiWave/HelsinkiWave';

import styled from 'styled-components';

const Container = styled.div`
  min-height: 21rem;
  width: 100%;
  background-color: ${props => props.theme.colors.lightYellow};
  padding: 2.5rem 1.5rem;

  ${BodyText} {
    margin-top: 1rem;
  }
`;

const LinkContainer = styled.ul`
  list-style-type: none;
  margin: 0;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const StyledLink = styled(UnstyledLink)`
  margin-right: 1rem;
  margin-bottom: 2rem;
  font-size: 1.4rem;
  line-height: 1.4;
  font-weight: 700;
  text-decoration: underline;
  color: ${props => props.theme.colors.black};
`;

const LearnMoreLink = styled(UnstyledLink)`
  text-decoration: underline;
  color: ${props => props.theme.colors.black};
`;

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <footer>
      <HelsinkiWave color="yellow" />
      <Container>
        <SecondaryTitle>{t('footer.header')}</SecondaryTitle>
        <LinkContainer>
          <StyledLink to={'#'}>{t('footer.link1')}</StyledLink>
          <StyledLink to={'#'}>{t('footer.link2')}</StyledLink>
          <StyledLink to={'#'}>{t('footer.link3')}</StyledLink>
          <StyledLink to={'#'}>{t('footer.link1')}</StyledLink>
          <StyledLink to={'#'}>{t('footer.link4')}</StyledLink>
          <StyledLink to={'#'}>{t('footer.link3')}</StyledLink>
        </LinkContainer>
        <BodyText>
          {t('footer.body')}{' '}
          <LearnMoreLink to={'#'}>{t('footer.learn_more')}</LearnMoreLink>
        </BodyText>
        <BodyText>
          {t('footer.attribution')}{' '}
          <LearnMoreLink to={'www.hel.fi'}>www.hel.fi</LearnMoreLink>
        </BodyText>
      </Container>
    </footer>
  );
};

export default Footer;
