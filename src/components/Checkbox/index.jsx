import checkbox from 'assets/images/checkbox.svg';
import checkboxActive from 'assets/images/checkbox-active.svg';
import classNames from 'classnames';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

export const Checkbox = ({ className, checked, onChange, label }) => {
  const toggleChecked = () => {
    onChange(prevValue => !prevValue);
  };

  return (
    <div className={classNames(styles.checkbox, className)}>
      <button type="button" id={label} onClick={toggleChecked}>
        <img
          className={styles.checkbox__icon}
          src={checked ? checkboxActive : checkbox}
          alt="checkbox"
        />
      </button>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={label}>
        <Text type="p3" className={styles.checkbox__text}>
          {label}
        </Text>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
