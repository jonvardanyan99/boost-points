import classNames from 'classnames';
import React from 'react';

import checkbox from '~/assets/images/checkbox.svg';
import checkboxActive from '~/assets/images/checkbox-active.svg';
import { Text } from '~/components/Text';

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
      <button className={styles.checkbox__button} id={label} type="button" onClick={toggleChecked}>
        <img
          alt="checkbox"
          className={styles.checkbox__icon}
          src={checked ? checkboxActive : checkbox}
        />
      </button>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={label}>
        <Text className={styles.checkbox__label} type="p3">
          {label}
        </Text>
      </label>
    </div>
  );
};
