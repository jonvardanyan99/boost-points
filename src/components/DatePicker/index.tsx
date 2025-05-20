import 'react-datepicker/dist/react-datepicker.css';

import calendar from 'assets/icons/calendar.svg';
import downArrow from 'assets/icons/down-arrow.svg';
import classNames from 'classnames';
import { Text } from 'components/Text';
import { format } from 'date-fns';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import React, { useEffect, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  placeholder: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  onBlur: () => void;
  label: string;
  error?: string | null;
}

export const DatePicker: React.FC<Props> = ({
  className,
  placeholder,
  value,
  onChange,
  onBlur,
  label,
  error,
}) => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (datePickerVisible) {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
          setDatePickerVisible(false);
        }
      };

      global.addEventListener('click', handleClickOutside);

      return () => global.removeEventListener('click', handleClickOutside);
    }
  }, [datePickerVisible]);

  useUpdateEffect(() => {
    if (!datePickerVisible) {
      onBlur();
    }
  }, [datePickerVisible]);

  const toggleDatePickerVisible = () => {
    setDatePickerVisible(prevValue => !prevValue);
  };

  const getDayClassName = (date: Date) => {
    const currentDay =
      value?.getFullYear() === date.getFullYear() &&
      value?.getMonth() === date.getMonth() &&
      value?.getDate() === date.getDate();

    if (currentDay) {
      return styles['day--selected'];
    }

    return styles['day--keyboard-selected'];
  };

  return (
    <div className={classNames(styles['date-picker'], className)} ref={datePickerRef}>
      <label htmlFor={label}>
        <Text type="p3" className={styles['date-picker__label-text']}>
          {label}
        </Text>
      </label>
      <button
        type="button"
        id={label}
        className={classNames(styles['date-picker__main-button'], {
          [styles['date-picker__main-button--active']]: datePickerVisible,
          [styles['date-picker__main-button--error']]: error,
        })}
        onClick={toggleDatePickerVisible}
      >
        <div>
          <img src={calendar} alt="calendar" />
          <Text type="p3">{value ? format(value, 'dd/MM/y') : placeholder}</Text>
        </div>
        <img src={downArrow} alt="down-arrow" />
      </button>
      {error && (
        <Text type="p4" className={styles['date-picker__error-text']}>
          {error}
        </Text>
      )}
      {datePickerVisible && (
        <ReactDatePicker
          calendarClassName={styles['date-picker__react-date-picker']}
          dayClassName={getDayClassName}
          selected={value}
          onChange={date => onChange(date)}
          onSelect={() => setDatePickerVisible(false)}
          dropdownMode="select"
          showMonthDropdown
          showYearDropdown
          inline
        />
      )}
    </div>
  );
};
