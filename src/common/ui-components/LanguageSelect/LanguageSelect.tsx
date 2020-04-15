import React from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames/bind';

import styles from './LanguageSelect.module.scss';

const cx = classnames.bind(styles);

export interface LanguageSelectProps {
  readonly supportedLanguages: string[];
  readonly className?: string;
  readonly darkMenu?: boolean;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  supportedLanguages,
  darkMenu,
}) => {
  const { i18n } = useTranslation();

  // console.log('changed to', darkMenu);
  return (
    <React.Fragment>
      {supportedLanguages.map((language: string, id: number) => {
        return (
          <button
            key={id}
            onClick={() => i18n.changeLanguage(language)}
            className={
              darkMenu
                ? cx({
                    languageButton: true,
                    languageButtonEnabled: language === i18n.language,
                    languageSwitchTextDark: darkMenu,
                  })
                : cx({
                    languageButton: true,
                    languageButtonEnabled: language === i18n.language,
                    languageSwitchTextWhite: true,
                  })
            }
            lang={language}
          >
            {language}
          </button>
        );
      })}
    </React.Fragment>
  );
};

export default LanguageSelect;
