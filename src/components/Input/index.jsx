import classNames from 'classnames';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

export const Input = ({
  type,
  className,
  placeholder,
  value,
  onChange,
  disabled,
  error,
  label,
}) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={label}>
          <Text type="p3" className={styles['label-text']}>
            {label}
          </Text>
        </label>
      )}
      <input
        type={type}
        id={label}
        className={classNames(styles.input, {
          [styles['input--disabled']]: disabled,
          [styles['input--error']]: error,
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
};
