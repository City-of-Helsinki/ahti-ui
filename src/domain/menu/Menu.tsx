import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { ReactComponent as AhtiLogo } from '../../assets/icons/ahti_logo.svg';
import styles from './Menu.module.scss';
import NavDropdown from './NavDropdown';
import { useLocation } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { IconLocation, IconFood, IconMenu, IconClose } from 'hds-react';

const cx = classNames.bind(styles);

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
  readonly menuItems?: MenuItem[];
}

export const defaultMenuItems: MenuItem[] = [
  {
    title: 'islands',
    icon: <IconLocation />,
    links: [{ name: 'all_islands', url: '/map?type=myhelsinki' }],
  },
  {
    title: 'travel_to_islands',
    icon: <IconLocation />,
    links: [
      { name: 'water_bus_and_ferries', url: '/', disabled: true },
      { name: 'boat_rides_and_taxis', url: '/', disabled: true },
      { name: 'sightseeing_and_cruises', url: '/', disabled: true },
    ],
  },
  {
    title: 'saunas_and_swimming',
    icon: <IconLocation />,
    links: [
      { name: 'saunas', url: '/', disabled: true },
      { name: 'swimming', url: '/', disabled: true },
      { name: 'ice_swimming', url: '/', disabled: true },
    ],
  },
  {
    title: 'restaurants',
    icon: <IconFood />,
    links: [
      { name: 'restaurants', url: '/', disabled: true },
      { name: 'cafes', url: '/', disabled: true },
      { name: 'beer_and_wine_bars', url: '/', disabled: true },
    ],
  },
  {
    title: 'boater_services',
    icon: <IconLocation />,
    links: [
      { name: 'mooring', url: '/', disabled: true },
      { name: 'maintenance', url: '/', disabled: true },
      { name: 'septic_tank_draining', url: '/', disabled: true },
    ],
  },
  {
    title: 'rental_boats',
    icon: <IconLocation />,
    links: [
      { name: 'rowboats', url: '/', disabled: true },
      { name: 'motorboats', url: '/', disabled: true },
      { name: 'other', url: '/', disabled: true },
    ],
  },
];

const Menu: React.FC<MenuProps> = ({ menuItems = defaultMenuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const translatedMenuItems = menuItems.map(
    (menuItem: MenuItem): MenuItem => {
      return {
        ...menuItem,
        title: t(`menu.title.${menuItem.title}`),
        links: menuItem.links.map(
          (link: Link): Link => {
            return {
              ...link,
              name: t(`menu.link.${menuItem.title}.${link.name}`),
            };
          }
        ),
      };
    }
  );

  const renderLanguageButtons = () => {
    // TODO: Investigate: Can't use i18n.languages here as changeLanguage mutates
    //  the initial ['fi', 'en'] list to ['en'] when english is selected.
    return (
      <div>
        {['fi', 'en'].map((language: string, id: number) => {
          return (
            <button
              key={id}
              onClick={() => i18n.changeLanguage(language)}
              className={cx({
                languageButton: true,
                languageButtonEnabled: language === i18n.language,
              })}
            >
              {language}
            </button>
          );
        })}
      </div>
    );
  };

  const renderMenuContent = () => {
    return (
      <div className={styles.menuContentContainer}>
        {translatedMenuItems.map((item: MenuItem, id: number) => {
          return (
            <NavDropdown key={id} title={item.title} icon={item.icon}>
              <nav className={styles.navDropdownContent}>
                {item.links.map((link: Link, id: number) => {
                  return (
                    <RouterLink
                      key={id}
                      to={link.url}
                      className={cx({
                        navLink: true,
                        navLinkDisabled: link.disabled,
                      })}
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
    <div
      className={cx({
        container: true,
        mapPageMenu: location.pathname === '/map',
      })}
    >
      <div className={styles.headerContainer}>
        <RouterLink to={'/'}>
          <AhtiLogo />
        </RouterLink>
        {isOpen && renderLanguageButtons()}
        <div onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <IconClose className={styles.icon} />
          ) : (
            <IconMenu className={styles.icon} />
          )}
        </div>
      </div>
      {isOpen && renderMenuContent()}
    </div>
  );
};

export default Menu;
