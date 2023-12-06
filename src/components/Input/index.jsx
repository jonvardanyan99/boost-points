import classNames from 'classnames';
import React from 'react';

import { Text } from '../Text';
import styles from './styles.module.scss';

export const Input = ({ error, disabled }) => {
  return (
    <div>
      <input
        className={classNames(styles.input, {
          [styles['input--disabled']]: disabled,
          [styles['input--error']]: error,
        })}
        placeholder="text"
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
