import React from 'react';
import { useTranslation } from 'react-i18next';

import commonStyles from '../common/commonStyles.module.scss';
import { formatDepth } from '../../../utils/text';
import {
  Feature,
  HarborMooringType,
} from '../../../../domain/api/generated/types.d';

export interface HarborContentProps {
  readonly harbor: Feature;
}

const HarborContent: React.FC<HarborContentProps> = ({ harbor }) => {
  const { t } = useTranslation();
  const harborDetails = harbor.properties.details?.harbor;

  if (!harborDetails) {
    return null;
  }

  const { moorings, depth } = harborDetails;

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.description}>
        {harbor.properties.description}
      </div>
      <h2 className={commonStyles.subheading}>
        {t('card.harbor_content.mooring')}
      </h2>
      <div className={commonStyles.gridItem}>
        {moorings && (
          <>
            <div>{`${t('card.harbor_content.mooringType')}:`}</div>
            <div>
              {moorings
                .map((mooringType: HarborMooringType) =>
                  t(`card.harbor_content.mooringTypes.${mooringType}`)
                )
                .join(', ')}
            </div>
          </>
        )}
        {depth && (
          <>
            <div>{`${t('card.harbor_content.depth')}:`}</div>
            <div>
              {formatDepth({
                minDepth: depth.min,
                maxDepth: depth.max,
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HarborContent;
