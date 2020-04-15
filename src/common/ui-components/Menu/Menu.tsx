import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import Search from '../Search/Search';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { SUPPORTED_LANGUAGES } from '../../../common/translation/TranslationConstants';
import { useOvermind } from '../../../domain/overmind';
import AhtiLogo from '../AhtiLogo/AhtiLogo';
import MenuIcon from '../MenuIcon/MenuIcon';
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
  readonly translate?: boolean;
  readonly menuDark?: boolean;
  readonly menuCategories: MenuCategory[];
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
              name: t(`menu.link.${menuCategory.title}.${menuItem.name}`),
            };
          }
        ),
      };
    }
  );
};

const Menu: React.FC<MenuProps> = ({
  translate = false,
  menuDark,
  menuCategories,
  onSelect,
  onLogoClick,
}) => {
  const { state, actions } = useOvermind();
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
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
                      aria-label={menuItem.name}
                      tabIndex={0}
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
    <div
      className={
        isOpen ? classNames(styles.containerOpen) : classNames(styles.container)
      }
    >
      <div className={styles.headerContainer}>
        <div className={styles.menuElement}>
          <RouterLink to={'/'} onClick={() => onLogoClick && onLogoClick()}>
            <AhtiLogo fillColor={menuDark || isOpen ? '#001A33' : 'white'} />
          </RouterLink>
        </div>
        <div className={styles.menuElement}>
          <div>
            <LanguageSelect
              supportedLanguages={Object.values(SUPPORTED_LANGUAGES)}
              darkMenu={menuDark}
            />
          </div>
        </div>
        <div
          className={styles.menuElementFront}
          onClick={() => setIsOpen(true)}
        >
          <Search
            featuresToSearch={state.features}
            onSelect={(ahtiId) => {
              history.push('/content');
              actions.selectFeatureById(ahtiId);
            }}
            isMenuOpen={isOpen}
            isDark={menuDark}
          />
        </div>
        <div className={styles.menuElement}>
          <button
            className={styles.toggleMenuButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? t('menu.close') : t('menu.open')}
            tabIndex={0}
          >
            {isOpen ? (
              <MenuIcon isDark={menuDark} isOpen={true} />
            ) : (
              <MenuIcon isDark={menuDark} />
            )}
          </button>
        </div>
      </div>
      {isOpen && renderMenuContent()}
    </div>
  );
};

export default Menu;
