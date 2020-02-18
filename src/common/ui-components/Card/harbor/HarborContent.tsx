import React from 'react';
import CommonCardInfo from '../common/CommonCardInfo';
import { useTranslation } from 'react-i18next';
import commonStyles from '../common/commonStyles.module.scss';
import { formatDepth, formatPrice } from '../../../utils/text';
import classNames from 'classnames';

export interface HarborContentProps {
  readonly harbor: any;
}

const HarborContent: React.FC<HarborContentProps> = ({ harbor }) => {
  const { t } = useTranslation();

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.description}>
        {harbor.properties.description}
      </div>
      <h2 className={commonStyles.subheading}>
        {t('card.harbor_content.mooring')}
      </h2>
      <div className={commonStyles.gridItem}>
        <div>{`${t('card.harbor_content.mooringInformation')}:`}</div>
        <div>{harbor.mooringInformation}</div>
        <div>{`${t('card.harbor_content.mooringType')}:`}</div>
        <div>
          {harbor.mooringTypes
            .map((mooringType: string) =>
              t(`card.harbor_content.mooringTypes.${mooringType}`)
            )
            .join(', ')}
        </div>
        <div>{`${t('card.harbor_content.depth')}:`}</div>
        <div>{formatDepth(harbor.depth)}</div>
      </div>
      <h2 className={commonStyles.subheading}>
        {t('card.harbor_content.pricing')}
      </h2>
      <div className={commonStyles.gridItem}>
        <div>{`${t('card.harbor_content.dayPricing')}:`}</div>
        <div>{`${formatPrice(harbor.pricing.day)}`}</div>
        <div>{`${t('card.harbor_content.overnightPricing')}:`}</div>
        <div>{`${formatPrice(harbor.pricing.overnight)}`}</div>
      </div>
      <div
        className={classNames(
          commonStyles.gridItem,
          commonStyles.bookingUrlContainer
        )}
      >
        <a className={commonStyles.bookingUrl} href={harbor.bookingUrl}>{`${t(
          'card.harbor_content.booking'
        )}`}</a>
      </div>
      <CommonCardInfo feature={harbor} />
    </div>
  );
};

export default HarborContent;
