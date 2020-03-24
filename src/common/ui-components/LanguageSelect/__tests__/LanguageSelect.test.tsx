import React from 'react';
import { shallow } from 'enzyme';
import i18next from 'i18next';

import LanguageSelect from '../LanguageSelect';
import { SUPPORTED_LANGUAGES } from '../../../translation/TranslationConstants';

describe('LanguageSelect', () => {
  const supportedLanguages = Object.values(SUPPORTED_LANGUAGES);
  const wrapper = shallow(
    <LanguageSelect supportedLanguages={supportedLanguages} />
  );

  it('renders the component', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders all supported languages as buttons', () => {
    expect(wrapper.find('.languageButton')).toHaveLength(
      supportedLanguages.length
    );
  });

  it('changes language on click', () => {
    const mockOnLanguageChange = jest.fn();
    i18next.on('languageChanged', mockOnLanguageChange);
    expect(mockOnLanguageChange.mock.calls.length).toBe(0);
    wrapper
      .find('.languageButton')
      .not('.languageButtonEnabled')
      .simulate('click');
    expect(mockOnLanguageChange.mock.calls.length).toBe(1);
  });
});
