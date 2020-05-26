import React from 'react';
import { FormikHandlers } from 'formik';
import { TextArea, TextInput } from 'hds-react';

import styles from '../SuggestionForm.module.scss';
import { Tab, Tabs } from '../../../common/ui-components/Tabs/Tabs';
import { TranslatedField } from '../types';

interface TranslatedFieldInputProps {
  readonly labelText: string;
  readonly id: string;
  readonly value: TranslatedField;
  readonly handleChange: FormikHandlers['handleChange'];
  readonly textArea?: boolean;
  readonly error?: string;
  readonly className?: string;
}

const TranslatedFieldInput: React.FC<TranslatedFieldInputProps> = ({
  labelText,
  id,
  value,
  handleChange,
  textArea,
  error,
  className,
}) => {
  const Input = textArea ? TextArea : TextInput;
  return (
    <div className={className}>
      <label className={styles.labelText}>{labelText}</label>
      <Tabs>
        <Tab title={'fi'}>
          <Input
            id={`${id}.fi`}
            value={value.fi}
            onChange={handleChange}
            invalid={!!error}
            helperText={error}
          />
        </Tab>
        <Tab title={'en'}>
          <Input
            id={`${id}.en`}
            value={value.en}
            onChange={handleChange}
            invalid={!!error}
            helperText={error}
          />
        </Tab>
        <Tab title={'sv'}>
          <Input
            id={`${id}.sv`}
            value={value.sv}
            onChange={handleChange}
            invalid={!!error}
            helperText={error}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TranslatedFieldInput;
