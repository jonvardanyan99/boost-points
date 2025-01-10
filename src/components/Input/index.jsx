import clear from 'assets/icons/clear.svg';
import classNames from 'classnames';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import styles from './styles.module.scss';

export const Input = ({
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
    setValue('');
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

Input.propTypes = {
  type: PropTypes.oneOf(['tel', 'email', 'number']),
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  setValue: PropTypes.func,
  label: PropTypes.string,
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};
