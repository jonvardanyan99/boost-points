import downArrow from 'assets/images/down-arrow.svg';
import downArrowGray from 'assets/images/down-arrow-gray.svg';
import classNames from 'classnames';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';

export const Dropdown = ({
  className,
  placeholder,
  selectedOption,
  onChange,
  options,
  label,
  disabled,
}) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const mainButtonRef = useRef(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (optionsVisible) {
      const handleClickOutside = event => {
        if (!mainButtonRef.current.contains(event.target)) {
          setOptionsVisible(false);
        }
      };

      global.addEventListener('click', handleClickOutside);

      return () => global.removeEventListener('click', handleClickOutside);
    }
  }, [optionsVisible]);

  const toggleOptionsVisible = () => {
    setOptionsVisible(prevValue => !prevValue);
  };

  return (
    <div className={classNames(styles.dropdown, className)}>
      {label && (
        <label htmlFor={label}>
          <Text
            type="p4"
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
        ref={mainButtonRef}
        id={label}
        className={classNames(styles['main-button'], {
          [styles['main-button--active']]: optionsVisible,
          [styles['main-button--disabled']]: disabled,
        })}
        onClick={disabled ? undefined : toggleOptionsVisible}
      >
        {selectedOption || placeholder}
        <img src={disabled ? downArrowGray : downArrow} alt="down-arrow" />
      </button>
      {optionsVisible && (
        <div>
          {options.map(option => (
            <button key={option} type="button" onClick={() => onChange(option)}>
              {option}
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
  selectedOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};
