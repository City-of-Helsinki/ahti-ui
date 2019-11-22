import React from 'react';
import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';
import SecondaryTitle from '../../Components/SecondaryTitle/SecondaryTitle';
import BodyText from '../../Components/BodyText/BodyText';

import styled from 'styled-components';
import HelsinkiWave from '../../Components/HelsinkiWave/HelsinkiWave';

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

const TrackedOutboundLink = styled(ReactGA.OutboundLink)`
  text-decoration: none;
`;

const TrackedStyledLink = styled(TrackedOutboundLink)`
  margin-right: 1rem;
  margin-bottom: 2rem;
  font-size: 1.4rem;
  line-height: 1.4;
  font-weight: 700;
  text-decoration: underline;
  color: ${props => props.theme.colors.black};
`;

const TrackedLearnMoreLink = styled(TrackedOutboundLink)`
  text-decoration: underline;
  color: ${props => props.theme.colors.black};
`;

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <HelsinkiWave color="yellow" />
      <Container>
        <SecondaryTitle>{t('footer.header')}</SecondaryTitle>
        <LinkContainer>
          <TrackedStyledLink
            eventLabel="footer_link1"
            target="_blank"
            rel="noopener noreferrer"
            to={t('footer.link1.target')}
          >
            {t('footer.link1.content')}
          </TrackedStyledLink>
          <TrackedStyledLink
            eventLabel="footer_link2"
            target="_blank"
            rel="noopener noreferrer"
            to={t('footer.link2.target')}
          >
            {t('footer.link2.content')}
          </TrackedStyledLink>
          <TrackedStyledLink
            eventLabel="footer_link3"
            target="_blank"
            rel="noopener noreferrer"
            to={t('footer.link3.target')}
          >
            {t('footer.link3.content')}
          </TrackedStyledLink>
          <TrackedStyledLink
            eventLabel="footer_link4"
            target="_blank"
            rel="noopener noreferrer"
            to={t('footer.link4.target')}
          >
            {t('footer.link4.content')}
          </TrackedStyledLink>
          <TrackedStyledLink
            eventLabel="footer_link5"
            target="_blank"
            rel="noopener noreferrer"
            to={t('footer.link5.target')}
          >
            {t('footer.link5.content')}
          </TrackedStyledLink>
        </LinkContainer>
        <BodyText>
          {t('footer.body')}{' '}
          <TrackedLearnMoreLink eventLabel="learn_more" to={'#'}>
            {t('footer.learn_more')}
          </TrackedLearnMoreLink>
        </BodyText>
        <BodyText>
          {t('footer.attribution')}{' '}
          <TrackedLearnMoreLink
            eventLabel="footer_helfi"
            target="_blank"
            rel="noopener noreferrer"
            to={t('footer.attribution_link')}
          >
            www.hel.fi
          </TrackedLearnMoreLink>
        </BodyText>
      </Container>
    </footer>
  );
};

export default Footer;
