import React from 'react';
import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';
import UnstyledLink from '../UnstyledLink/UnstyledLink';
import { ReactComponent as Menu } from '../../assets/icons/menu.svg';
import { ReactComponent as Exit } from '../../assets/icons/exit.svg';
import styles from './DropdownMenu.module.scss';

const POINT_TYPES = ['myhelsinki'];

const DropdownMenu = ({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}) => {
  const { t, i18n } = useTranslation();

  return (
    <React.Fragment>
      <button
        className={`${styles.menuButton} ${
          isOpen ? '' : styles.menuButtonIsClosed
        }`}
        onClick={() => (isOpen ? onClose() : onOpen())}
        aria-expanded={isOpen}
        aria-label={t('dropdown.label')}
      >
        {isOpen ? <Exit /> : <Menu />}
      </button>
      <div
        className={`${styles.backDrop} ${isOpen ? '' : styles.backDropClosed}`}
      >
        <div className={styles.body}>
          <div className={styles.languageButtonContainer}>
            <button
              className={`${styles.languageButton} ${
                i18n.language === 'fi' ? styles.languageButtonIsActive : ''
              }`}
              onClick={() => i18n.changeLanguage('fi')}
            >
              fi
            </button>
            <button
              className={`${styles.languageButton} ${
                i18n.language === 'en' ? styles.languageButtonIsActive : ''
              }`}
              onClick={() => i18n.changeLanguage('en')}
            >
              en
            </button>
          </div>
          <div className={styles.textSection}>
            <ReactGA.OutboundLink
              className={styles.trackedOutboundLink}
              eventLabel="give_feedback"
              target="_blank"
              rel="noopener noreferrer"
              to={t('dropdown.give_feedback_target')}
            >
              <p className={styles.bodyText}>{t('dropdown.give_feedback')}</p>
            </ReactGA.OutboundLink>
          </div>
          <hr className={styles.line} />
          <div className={styles.textSection}>
            <ReactGA.OutboundLink
              className={styles.trackedOutboundLink}
              eventLabel="add_location"
              target="_blank"
              rel="noopener noreferrer"
              to={t('dropdown.add_location_target')}
            >
              <p className={styles.bodyText}>{t('dropdown.add_location')}</p>
            </ReactGA.OutboundLink>
          </div>
          <hr className={styles.line} />
          <div className={styles.textSection}>
            {POINT_TYPES &&
              POINT_TYPES.map((type, id) => (
                <UnstyledLink
                  to={`/map?type=${type}`}
                  key={id}
                  onClick={() => (isOpen ? onClose() : onOpen())}
                >
                  <p className={styles.bodyText}>{t(`types.${type}`)}</p>
                </UnstyledLink>
              ))}
          </div>
          <hr className={styles.line} />
          <div className={styles.textSection}>
            <ReactGA.OutboundLink
              className={styles.trackedOutboundLink}
              eventLabel="boat_page"
              target="_blank"
              rel="noopener noreferrer"
              to={t('dropdown.boat_page_target')}
            >
              <p className={styles.bodyText}>{t('dropdown.boat_page')}</p>
            </ReactGA.OutboundLink>
            <ReactGA.OutboundLink
              className={styles.trackedOutboundLink}
              eventLabel="rescue_directions"
              target="_blank"
              rel="noopener noreferrer"
              to={t('dropdown.rescue_directions_target')}
            >
              <p className={styles.bodyText}>
                {t('dropdown.rescue_directions')}
              </p>
            </ReactGA.OutboundLink>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DropdownMenu;
