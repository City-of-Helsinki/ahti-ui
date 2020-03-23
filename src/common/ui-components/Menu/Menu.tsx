import React, { ReactNode, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconMenu, IconClose } from 'hds-react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import { ReactComponent as AhtiLogo } from '../../../assets/icons/ahti_logo.svg';
import NavDropdown from './NavDropdown/NavDropdown';
import styles from './Menu.module.scss';

export type MenuItem = {
  readonly categoryIds: string[];
  readonly tagIds: string[];
  readonly name: string;
  readonly url?: string;
  readonly outbound?: boolean;
  readonly disabled?: boolean;
};

export type MenuCategory = {
  readonly title: string;
  readonly category: string;
  readonly menuItems: MenuItem[];
};

export interface MenuProps {
  readonly className?: string;
  readonly translate?: boolean;
  readonly menuCategories: MenuCategory[];
  readonly openComponent?: ReactNode;
  readonly closedComponent?: ReactNode;
  onSelect?(menuItem: MenuItem): void;
  onLogoClick?(): void;
}

const translateMenuCategories = (
  t: TFunction,
  menuCategories: MenuCategory[]
): MenuCategory[] => {
  return menuCategories.map(
    (menuCategory: MenuCategory): MenuCategory => {
      return {
        ...menuCategory,
        title: t(`menu.title.${menuCategory.title}`),
        menuItems: menuCategory.menuItems.map(
          (menuItem: MenuItem): MenuItem => {
            return {
              ...menuItem,
              name: t(`menu.link.${menuCategory.title}.${menuItem.name}`)
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
  menuCategories,
  openComponent,
  closedComponent,
  onSelect,
  onLogoClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const items: MenuCategory[] = translate
    ? translateMenuCategories(t, menuCategories)
    : menuCategories;

  const renderMenuContent = () => {
    return (
      <div className={styles.menuContentContainer}>
        {items.map((item: MenuCategory, id: number) => {
          return (
            <NavDropdown key={id} title={item.title} category={item.category}>
              <nav className={styles.navDropdownContent}>
                {item.menuItems.map((menuItem: MenuItem, id: number) => {
                  return (
                    <button
                      key={id}
                      className={classNames(
                        styles.navLink,
                        menuItem.disabled && styles.navLinkDisabled
                      )}
                      disabled={menuItem.disabled}
                      onClick={() => {
                        setIsOpen(false);
                        onSelect && onSelect(menuItem);
                      }}
                    >
                      {menuItem.name}
                    </button>
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
        <div>
          <RouterLink to={'/'} onClick={() => onLogoClick && onLogoClick()}>
            <AhtiLogo />
          </RouterLink>
        </div>
        <div>
          <div className={styles.headerComponent}>
            {isOpen && openComponent}
            {!isOpen && closedComponent}
          </div>
        </div>
        <div>
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
      </div>
      {isOpen && renderMenuContent()}
    </div>
  );
};

export default Menu;
