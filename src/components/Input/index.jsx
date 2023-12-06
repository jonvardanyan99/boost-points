import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Text } from '../Text';
import styles from './styles.module.scss';

export const Input = ({ error, disabled, value, onChange }) => {
  // eslint-disable-next-line no-console
  console.log(value);

  return (
    <div>
      <input
        className={classNames(styles.input, {
          [styles['input--disabled']]: disabled,
          [styles['input--error']]: error,
        })}
        placeholder="text"
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
  error: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
