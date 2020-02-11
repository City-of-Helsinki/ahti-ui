import React from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames/bind';
import styles from './LanguageSelect.module.scss';

const cx = classnames.bind(styles);

export interface LanguageSelectProps {
  readonly supportedLanguages: string[];
  readonly className?: string;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({
  supportedLanguages,
  className
}) => {
  const { i18n } = useTranslation();

  return (
    <div className={className}>
      {supportedLanguages.map((language: string, id: number) => {
        return (
          <button
            key={id}
            onClick={() => i18n.changeLanguage(language)}
            className={cx({
              languageButton: true,
              languageButtonEnabled: language === i18n.language
            })}
            lang={language}
          >
            {language}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelect;
