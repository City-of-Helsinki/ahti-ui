import React from 'react';
import styles from './commonStyles.module.scss';
import { IconInfo, IconLocation } from 'hds-react';
import { useTranslation } from 'react-i18next';
import localizedToDMS from '../../../utils/dms';

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
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={url}
            className={styles.infoLink}
          >
            <div className={styles.iconContainer}>
              <IconInfo className={styles.infoIcon} />
              <div className={styles.bodyText}>{url}</div>
            </div>
          </a>
        </>
      )}

      {phoneNumber && phoneNumber.length > 0 && (
        <>
          <hr className={styles.line} />
          <div className={styles.iconContainer}>
            <IconInfo className={styles.infoIcon} />
            <div className={styles.bodyText}>{phoneNumber}</div>
          </div>
        </>
      )}

      {feature.geometry.type === 'Point' && (
        <>
          <hr className={styles.line} />
          <div className={styles.iconContainer}>
            <IconLocation className={styles.infoIcon} />
            <div className={styles.bodyText}>
              {localizedToDMS(
                feature.geometry.coordinates[0],
                feature.geometry.coordinates[1],
                i18n.language
              )}
            </div>
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
