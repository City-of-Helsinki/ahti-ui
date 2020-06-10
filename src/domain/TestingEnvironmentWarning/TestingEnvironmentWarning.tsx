import React from 'react';
import { DismissableNotification } from 'hds-react';
import { useTranslation } from 'react-i18next';

import styles from './TestingEnvironmentWarning.module.scss';

const TestingEnvironmentWarning: React.FC = () => {
  const { t } = useTranslation();
  if (process.env.REACT_APP_ENV !== 'production') {
    return (
      <div className={styles.notificationContainer}>
        <DismissableNotification
          labelText={t('testing_environment_warning.label')}
          closeButtonLabelText={t(
            'testing_environment_warning.close_button_label'
          )}
          type="warning"
        >
          <a
            className={styles.link}
            href="https://ahti.hel.fi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('testing_environment_warning.link_text')}
          </a>
        </DismissableNotification>
      </div>
    );
  }
  return null;
};

export default TestingEnvironmentWarning;
