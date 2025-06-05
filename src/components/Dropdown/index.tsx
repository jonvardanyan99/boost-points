import classNames from 'classnames';
import { FormikErrors } from 'formik';
import React, { useEffect, useRef, useState } from 'react';

import downArrow from '~/assets/icons/down-arrow.svg';
import downArrowGray from '~/assets/icons/down-arrow-gray.svg';
import { Text } from '~/components/Text';
import {
  CountryCodeOptions,
  DocumentTypeOptions,
  GenderOptions,
  StateOptions,
} from '~/constants/selectOptions';
import { useUpdateEffect } from '~/hooks/useUpdateEffect';

import styles from './styles.module.scss';

type Options = CountryCodeOptions | DocumentTypeOptions | GenderOptions | StateOptions;

interface Props {
  className?: string;
  placeholder: string;
  selectedOption: Options[number] | null;
  onChange: (option: Options[number]) => void;
  onBlur: () => Promise<void> | Promise<FormikErrors<unknown>>;
  options: Options;
  label?: string;
  disabled?: boolean;
  error: string | null;
}

export const Dropdown: React.FC<Props> = ({
  className,
  placeholder,
  selectedOption,
  onChange,
  onBlur,
  options,
  label,
  disabled,
  error,
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (optionsVisible) {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setOptionsVisible(false);
        }
      };

      global.addEventListener('click', handleClickOutside);

      return () => global.removeEventListener('click', handleClickOutside);
    }
  }, [optionsVisible]);

  useUpdateEffect(() => {
    if (!optionsVisible) {
      onBlur();
    }
  }, [optionsVisible]);

  const toggleOptionsVisible = () => {
    setOptionsVisible(prevValue => !prevValue);
  };

  const handleOptionClick = (option: Options[number]) => {
    onChange(option);
    setOptionsVisible(false);
  };

  return (
    <div className={classNames(styles.dropdown, className)} ref={dropdownRef}>
      {label && (
        <label htmlFor={label}>
          <Text
            className={classNames(styles['dropdown__label-text'], {
              [styles['dropdown__label-text--disabled']]: disabled,
            })}
            type="p3"
          >
            {label}
          </Text>
        </label>
      )}
      <button
        className={classNames(styles['dropdown__main-button'], {
          [styles['dropdown__main-button--active']]: optionsVisible,
          [styles['dropdown__main-button--disabled']]: disabled,
          [styles['dropdown__main-button--error']]: error,
        })}
        id={label}
        type="button"
        onClick={disabled ? undefined : toggleOptionsVisible}
      >
        {selectedOption?.label || placeholder}
        <img alt="down-arrow" src={disabled ? downArrowGray : downArrow} />
      </button>
      {error && (
        <Text className={styles['dropdown__error-text']} type="p4">
          {error}
        </Text>
      )}
      {optionsVisible && (
        <div>
          {options.map(option => (
            <button key={option.value} type="button" onClick={() => handleOptionClick(option)}>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
