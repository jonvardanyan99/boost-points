import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Text } from '../Text';
import styles from './styles.module.scss';

export const Input = ({ className, placeholder, value, onChange, disabled, error }) => {
  return (
    <div className={className}>
      <input
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
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};
