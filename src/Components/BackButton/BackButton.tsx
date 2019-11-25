import React from 'react';
import { useTranslation } from 'react-i18next';
import BaseButton from '../BaseButton/BaseButton';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow_left.svg';

import styled from 'styled-components';

interface ButtonProps {
  readonly whiteBtn?: boolean;
}

const Button = styled(BaseButton)<ButtonProps>`
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

interface BackButtonProps extends ButtonProps {
  onBack(event: React.MouseEvent<HTMLButtonElement>): void;
}

const BackButton: React.FC<BackButtonProps> = ({ onBack, whiteBtn }) => {
  const { t } = useTranslation();
  return (
    <Button whiteBtn={whiteBtn} onClick={onBack}>
      <ArrowLeft />
      {t('map.back_button')}
    </Button>
  );
};

export default BackButton;
