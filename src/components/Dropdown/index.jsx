import downArrow from 'assets/icons/down-arrow.svg';
import downArrowGray from 'assets/icons/down-arrow-gray.svg';
import classNames from 'classnames';
import { Text } from 'components/Text';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';

export const Dropdown = ({
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
  const dropdownRef = useRef(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (optionsVisible) {
      const handleClickOutside = event => {
        if (!dropdownRef.current.contains(event.target)) {
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

  const handleOptionClick = option => {
    onChange(option);
    setOptionsVisible(false);
  };

  return (
    <div className={classNames(styles.dropdown, className)} ref={dropdownRef}>
      {label && (
        <label htmlFor={label}>
          <Text
            type="p3"
            className={classNames(styles['dropdown__label-text'], {
              [styles['dropdown__label-text--disabled']]: disabled,
            })}
          >
            {label}
          </Text>
        </label>
      )}
      <button
        type="button"
        id={label}
        className={classNames(styles['dropdown__main-button'], {
          [styles['dropdown__main-button--active']]: optionsVisible,
          [styles['dropdown__main-button--disabled']]: disabled,
          [styles['dropdown__main-button--error']]: error,
        })}
        onClick={disabled ? undefined : toggleOptionsVisible}
      >
        {selectedOption?.label || placeholder}
        <img src={disabled ? downArrowGray : downArrow} alt="down-arrow" />
      </button>
      {error && (
        <Text type="p4" className={styles['dropdown__error-text']}>
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

Dropdown.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  selectedOption: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape).isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};
