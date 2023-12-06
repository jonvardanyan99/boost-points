import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Text } from '../Text';
import styles from './styles.module.scss';

export const Input = ({ disabled, error, className, placeholder, value, onChange }) => {
  return (
    <div className={className}>
      <input
        className={classNames(styles.input, {
          [styles['input--disabled']]: disabled,
          [styles['input--error']]: error,
        })}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
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
  disabled: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
