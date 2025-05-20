import clear from 'assets/icons/clear.svg';
import classNames from 'classnames';
import { Text } from 'components/Text';
import React, { useCallback } from 'react';

import styles from './styles.module.scss';

interface Props {
  type?: 'tel' | 'email' | 'number';
  className?: string;
  placeholder: string;
  name?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  setValue?: (value: string) => void;
  label?: string;
  clearable?: boolean;
  disabled?: boolean;
  error?: string | null;
}

export const Input: React.FC<Props> = ({
  type,
  className,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  setValue,
  label,
  clearable,
  disabled,
  error,
}) => {
  const clearValue = useCallback(() => {
    if (setValue) {
      setValue('');
    }
  }, [setValue]);

  return (
    <div className={className}>
      {label && (
        <label htmlFor={label}>
          <Text type="p3" className={styles['label-text']}>
            {label}
          </Text>
        </label>
      )}
      {clearable ? (
        <div className={styles['input-wrapper']}>
          <input
            type={type}
            id={label}
            className={classNames(styles.input, {
              [styles['input--disabled']]: disabled,
              [styles['input--error']]: error,
            })}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
          />
          {value && (
            <button
              type="button"
              className={classNames(styles['clear-icon-button'], {
                [styles['clear-icon-button--disabled']]: disabled,
              })}
              onClick={clearValue}
            >
              <img src={clear} alt="clear" />
            </button>
          )}
        </div>
      ) : (
        <input
          type={type}
          id={label}
          className={classNames(styles.input, {
            [styles['input--disabled']]: disabled,
            [styles['input--error']]: error,
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
      )}
      {error && (
        <Text type="p4" className={styles['error-text']}>
          {error}
        </Text>
      )}
    </div>
  );
};
