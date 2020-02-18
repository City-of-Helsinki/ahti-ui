import React, { useState } from 'react';
import styles from './Menu.module.scss';
import NavDropdown from './NavDropdown/NavDropdown';
import { Link as RouterLink } from 'react-router-dom';
import { IconMenu, IconClose } from 'hds-react';
import { ReactComponent as AhtiLogo } from '../../../assets/icons/ahti_logo.svg';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

export type Link = {
  readonly name: string;
  readonly url: string;
  readonly outbound?: boolean;
  readonly disabled?: boolean;
};

export type MenuItem = {
  readonly title: string;
  readonly icon: React.ReactElement;
  readonly links: Link[];
};

export interface MenuProps {
  readonly className?: string;
  readonly translate?: boolean;
  readonly menuItems: MenuItem[];
}

const translateMenuItems = (
  t: TFunction,
  menuItems: MenuItem[]
): MenuItem[] => {
  return menuItems.map(
    (menuItem: MenuItem): MenuItem => {
      return {
        ...menuItem,
        title: t(`menu.title.${menuItem.title}`),
        links: menuItem.links.map(
          (link: Link): Link => {
            return {
              ...link,
              name: t(`menu.link.${menuItem.title}.${link.name}`)
            };
          }
        )
      };
    }
  );
};

const Menu: React.FC<MenuProps> = ({
  className,
  translate = false,
  menuItems,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const items: MenuItem[] = translate
    ? translateMenuItems(t, menuItems)
    : menuItems;

  const renderMenuContent = () => {
    return (
      <div className={styles.menuContentContainer}>
        {items.map((item: MenuItem, id: number) => {
          return (
            <NavDropdown key={id} title={item.title} icon={item.icon}>
              <nav className={styles.navDropdownContent}>
                {item.links.map((link: Link, id: number) => {
                  return (
                    <RouterLink
                      key={id}
                      to={link.url}
                      className={classNames(
                        styles.navLink,
                        link.disabled && styles.navLinkDisabled
                      )}
                    >
                      {link.name}
                    </RouterLink>
                  );
                })}
              </nav>
            </NavDropdown>
          );
        })}
      </div>
    );
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.headerContainer}>
        <RouterLink to={'/'}>
          <AhtiLogo />
        </RouterLink>
        {isOpen && children}
        <button
          className={styles.toggleMenuButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t('menu.close') : t('menu.open')}
        >
          {isOpen ? (
            <IconClose className={styles.icon} />
          ) : (
            <IconMenu className={styles.icon} />
          )}
        </button>
      </div>
      {isOpen && renderMenuContent()}
    </div>
  );
};

export default Menu;
