import React from 'react';
import classNames from 'classnames';

import styles from './Select.module.scss';

interface Option {
  label: string;
  value: string | number;
}

export type SelectProps = {
  name?: string;
  labelText?: string;
  className?: string;
  value: Option['value'] | undefined;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  id?: string;
};

const Select: React.FC<SelectProps> = ({
  name,
  id,
  labelText,
  className,
  value,
  options,
  onChange,
  required,
  disabled,
}) => {
  const optionsItems = options.map(({ value, label }) => (
    <option key={value} value={value}>
      {label}
    </option>
  ));

  return (
    <div className={className}>
      {labelText && (
        <label className={styles.labelText} htmlFor={id}>
          {labelText}
        </label>
      )}
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classNames(styles.select, { [styles.disabled]: disabled })}
      >
        {!required && <option>-</option>}
        {optionsItems}
      </select>
    </div>
  );
};

export default Select;
