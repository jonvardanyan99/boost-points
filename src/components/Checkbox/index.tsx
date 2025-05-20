import checkbox from 'assets/images/checkbox.svg';
import checkboxActive from 'assets/images/checkbox-active.svg';
import classNames from 'classnames';
import { Text } from 'components/Text';
import React from 'react';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  checked: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
}

export const Checkbox: React.FC<Props> = ({ className, checked, onChange, label }) => {
  const toggleChecked = () => {
    onChange(prevValue => !prevValue);
  };

  return (
    <div className={classNames(styles.checkbox, className)}>
      <button type="button" id={label} className={styles.checkbox__button} onClick={toggleChecked}>
        <img
          className={styles.checkbox__icon}
          src={checked ? checkboxActive : checkbox}
          alt="checkbox"
        />
      </button>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={label}>
        <Text type="p3" className={styles.checkbox__label}>
          {label}
        </Text>
      </label>
    </div>
  );
};
