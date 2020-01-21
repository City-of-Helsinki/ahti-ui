import React from 'react';
import ReactGA from 'react-ga';
import BackButton from '../../Components/BackButton/BackButton';
import BodyText from '../../Components/BodyText/BodyText';
import CardTextContainer from '../../Components/CardTextContainer/CardTextContainer';
import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { ReactComponent as Location } from '../../assets/icons/location.svg';
import CardImageContainer from './CardImageContainer';
import CardDescription from './CardDescription';
import styles from './Card.module.scss';
import { useTranslation } from 'react-i18next';
import { Tab, Tabs } from '../../common/tabs/Tabs';
import localizedToDMS from '../../common/utils/dms';

const Card = ({ pointData, onBack }: { pointData: any; onBack: any }) => {
  const {
    name,
    url,
    modifiedAt,
    description,
    images,
    tags,
  } = pointData.properties;
  const source = pointData.properties.source.system;
  const phoneNumber = pointData.properties.contactInfo.phoneNumber;
  const { postalCode, municipality } = pointData.properties.contactInfo.address;
  const [lon, lat] = pointData.geometry.coordinates;

  const { t, i18n } = useTranslation();

  const renderTags = () => {
    return (
      <>
        {tags.map((tag: any, id: number) => (
          <span key={id}>{`#${tag.name}`}</span>
        ))}
      </>
    );
  };

  return (
    <div className={styles.cardContainer}>
      <BackButton onBack={onBack} />
      <div className={styles.cardContentContainer}>
        <CardImageContainer images={images} />
        <CardTextContainer>
          <h1 className={styles.nameHeading}>{name}</h1>
          <h2
            className={styles.addressHeading}
          >{`${postalCode} ${municipality}`}</h2>
          <div className={styles.tagsContainer}>{renderTags()}</div>

          <Tabs>
            <Tab title={t('card.description')}>
              <CardDescription description={description} />
            </Tab>
            <Tab title={t('card.routes')} disabled>
              <div></div>
            </Tab>
            <Tab title={t('card.services')} disabled>
              <div></div>
            </Tab>
          </Tabs>

          <div className={styles.infoContainer}>
            <hr className={styles.line} />
            <ReactGA.OutboundLink
              eventLabel={url}
              target="_blank"
              rel="noopener noreferrer"
              to={url}
            >
              <div className={styles.iconContainer}>
                <Home height="24" viewBox="0 0 48 48" />
                <BodyText>{url}</BodyText>
              </div>
            </ReactGA.OutboundLink>

            {phoneNumber && phoneNumber.length > 0 && (
              <>
                <hr className={styles.line} />
                <div className={styles.iconContainer}>
                  <Info height="24" viewBox="0 0 48 48" />
                  <BodyText>{phoneNumber}</BodyText>
                </div>
              </>
            )}

            <hr className={styles.line} />
            <div className={styles.iconContainer}>
              <Location height="24" viewBox="0 0 48 48" />
              <BodyText>{localizedToDMS(lat, lon, i18n.language)}</BodyText>
            </div>

            <hr className={styles.line} />
            <div className={styles.sourceInfoContainer}>
              <div>{`${t('card.source')}: ${source}`}</div>
              <div>
                {`${t('card.modified_at')} ${new Date(
                  modifiedAt
                ).toLocaleDateString(i18n.language)}`}
              </div>
            </div>
          </div>
        </CardTextContainer>
      </div>
    </div>
  );
};

export default Card;
