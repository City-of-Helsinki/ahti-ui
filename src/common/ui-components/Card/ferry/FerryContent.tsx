import React from 'react';
import CommonCardInfo from '../common/CommonCardInfo';
import { formatPrice, formatDuration } from '../../../utils/text';
import { useTranslation } from 'react-i18next';
import commonStyles from '../common/commonStyles.module.scss';
import classNames from 'classnames';

export interface FerryContentProps {
  readonly ferry: any;
}

const FerryContent: React.FC<FerryContentProps> = ({ ferry }) => {
  const { t } = useTranslation();

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.description}>
        {ferry.properties.description}
      </div>
      <div className={commonStyles.gridItem}>
        <div>{`${t('card.ferry_content.duration')}:`}</div>
        <div>{formatDuration(ferry.duration)}</div>
        <div>{`${t('card.ferry_content.pricing')}:`}</div>
        <div>{`${t('card.ferry_content.adultPricing')}: ${formatPrice(
          ferry.pricing.adult
        )}, ${t('card.ferry_content.childPricing')}: ${formatPrice(
          ferry.pricing.child
        )}`}</div>
      </div>
      <div className={commonStyles.gridItem}>
        <div>{`${t('card.ferry_content.startingPort')}:`}</div>
        <div>{`${ferry.portAddress.streetAddress}, ${ferry.portAddress.municipality}`}</div>
      </div>
      <div
        className={classNames(
          commonStyles.gridItem,
          commonStyles.bookingUrlContainer
        )}
      >
        <a className={commonStyles.bookingUrl} href={ferry.bookingUrl}>{`${t(
          'card.ferry_content.booking'
        )}`}</a>
      </div>
      <CommonCardInfo feature={ferry} />
    </div>
  );
};

export default FerryContent;
