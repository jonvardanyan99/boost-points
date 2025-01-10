import classNames from 'classnames';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

export const Textarea = ({ className, label, placeholder, name, value, onChange }) => {
  return (
    <div className={classNames(styles['text-area'], className)}>
      <Text type="p3" className={styles['text-area__label-text']}>
        {label}
      </Text>
      <textarea
        className={styles['text-area__field']}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Textarea.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
