import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseButton from '../BaseButton/BaseButton';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow_left.svg';

import styled from 'styled-components';

const Button = styled(BaseButton)`
  /** Positioning */
  position: absolute;
  z-index: 1399;
  top: -3.5rem;

  /** Styling */
  padding: 1rem;

  color: ${props =>
    props.whiteBtn ? props.theme.colors.white : props.theme.colors.black};
  background-color: ${props => props.theme.colors.transparent};

  font-family: ${props => props.theme.fonts.fontFamilyBold};
  font-size: 1.3rem;
  line-height: 1.3rem;
`;

export default ({ onBack }) => {
  const { t, i18n } = useTranslation();
  return (
    <Button onClick={onBack}>
      <ArrowLeft />
      {t('map.back_button')}
    </Button>
  );
};
