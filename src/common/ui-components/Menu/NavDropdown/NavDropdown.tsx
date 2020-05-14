import React, { KeyboardEventHandler, useState } from 'react';
import classNames from 'classnames/bind';
import { IconAngleRight } from 'hds-react';
import { useTranslation } from 'react-i18next';

import styles from './NavDropdown.module.scss';
import CategoryIcon from '../../CategoryIcon/CategoryIcon';

const cx = classNames.bind(styles);

export interface NavDropdownProps {
  readonly title: string;
  readonly category: string;
  readonly initiallyOpen?: boolean;
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  title,
  category,
  initiallyOpen = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const { t } = useTranslation();

  const enterPressed = (event: React.KeyboardEvent): boolean => {
    const code = event.keyCode || event.which;
    return code === 13;
  };

  // FIXME: layout:grid doesn't work inside buttons on chrome. hence a div is used here instead
  return (
    <div className={styles.container}>
      <div
        className={styles.headerContainer}
        onClick={() => setIsOpen(!isOpen)}
        onKeyPress={(event) => enterPressed(event) && setIsOpen(!isOpen)}
        role={'button'}
        aria-pressed={isOpen}
        aria-label={isOpen ? t('menu.close_submenu') : t('menu.open_submenu')}
        tabIndex={0}
      >
        <CategoryIcon category={category} className={styles.largeIcon} />
        <div className={styles.titleContainer}>{title}</div>
        <IconAngleRight
          className={cx({
            icon: true,
            angleIconOpen: isOpen,
            angleIconClosed: !isOpen,
          })}
        />
      </div>
      {isOpen && <div className={styles.childrenContainer}>{children}</div>}
    </div>
  );
};

export default NavDropdown;
