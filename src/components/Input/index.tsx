import classNames from 'classnames';
import React, { useCallback } from 'react';

import clear from '~/assets/icons/clear.svg';
import { Text } from '~/components/Text';

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
          <Text className={styles['label-text']} type="p3">
            {label}
          </Text>
        </label>
      )}
      {clearable ? (
        <div className={styles['input-wrapper']}>
          <input
            className={classNames(styles.input, {
              [styles['input--disabled']]: disabled,
              [styles['input--error']]: error,
            })}
            disabled={disabled}
            id={label}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
          {value && (
            <button
              className={classNames(styles['clear-icon-button'], {
                [styles['clear-icon-button--disabled']]: disabled,
              })}
              type="button"
              onClick={clearValue}
            >
              <img alt="clear" src={clear} />
            </button>
          )}
        </div>
      ) : (
        <input
          className={classNames(styles.input, {
            [styles['input--disabled']]: disabled,
            [styles['input--error']]: error,
          })}
          disabled={disabled}
          id={label}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
        />
      )}
      {error && (
        <Text className={styles['error-text']} type="p4">
          {error}
        </Text>
      )}
    </div>
  );
};
