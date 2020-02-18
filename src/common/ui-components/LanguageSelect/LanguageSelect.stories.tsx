import React from 'react';
import LanguageSelect from './LanguageSelect';

import { SUPPORTED_LANGUAGES } from '../../translation/TranslationConstants';

export default {
  title: 'LanguageSelect',
  component: LanguageSelect
};

export const SupportedLanguages = () => (
  <LanguageSelect supportedLanguages={Object.values(SUPPORTED_LANGUAGES)} />
);

SupportedLanguages.story = {
  name: 'Supported languages'
};
