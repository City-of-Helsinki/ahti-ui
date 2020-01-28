import React from 'react';
import styles from '../Card.module.scss';
import ReactGA from 'react-ga';
import BodyText from '../../../Components/BodyText/BodyText';
import { ReactComponent as Home } from '../../../assets/icons/home.svg';
import { ReactComponent as Info } from '../../../assets/icons/info.svg';
import { ReactComponent as Location } from '../../../assets/icons/location.svg';
import localizedToDMS from '../../../common/utils/dms';
import { useTranslation } from 'react-i18next';

const CommonCardInfo = ({ feature }: { feature: any }) => {
  const { url, modifiedAt } = feature.properties;
  const source = feature.properties.source.system;
  const phoneNumber = feature.properties.contactInfo.phoneNumber;

  const { t, i18n } = useTranslation();

  return (
    <div className={styles.infoContainer}>
      {url && url.length > 0 && (
        <>
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
        </>
      )}

      {phoneNumber && phoneNumber.length > 0 && (
        <>
          <hr className={styles.line} />
          <div className={styles.iconContainer}>
            <Info height="24" viewBox="0 0 48 48" />
            <BodyText>{phoneNumber}</BodyText>
          </div>
        </>
      )}

      {feature.geometry.type === 'Point' && (
        <>
          <hr className={styles.line} />
          <div className={styles.iconContainer}>
            <Location height="24" viewBox="0 0 48 48" />
            <BodyText>
              {localizedToDMS(
                feature.geometry.coordinates[0],
                feature.geometry.coordinates[1],
                i18n.language
              )}
            </BodyText>
          </div>
        </>
      )}

      <hr className={styles.line} />
      <div className={styles.sourceInfoContainer}>
        <div>{`${t('card.source')}: ${source}`}</div>
        <div>
          {`${t('card.modified_at')} ${new Date(modifiedAt).toLocaleDateString(
            i18n.language
          )}`}
        </div>
      </div>
    </div>
  );
};

export default CommonCardInfo;
