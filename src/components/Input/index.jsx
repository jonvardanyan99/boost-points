import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Text } from '../Text';
import styles from './styles.module.scss';

export const Input = ({ disabled, error, placeholder, value, onChange }) => {
  // eslint-disable-next-line no-console
  console.log(value);

  return (
    <div className={styles['input-container']}>
      <input
        className={classNames(styles.input, {
          [styles['input--disabled']]: disabled,
          [styles['input--error']]: error,
        })}
        placeholder={placeholder}
        disabled={disabled}
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
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
