import 'react-datepicker/dist/react-datepicker.css';

import classNames from 'classnames';
import { format } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import calendar from '~/assets/icons/calendar.svg';
import downArrow from '~/assets/icons/down-arrow.svg';
import { Text } from '~/components/Text';
import { useUpdateEffect } from '~/hooks/useUpdateEffect';

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
        <Text className={styles['date-picker__label-text']} type="p3">
          {label}
        </Text>
      </label>
      <button
        className={classNames(styles['date-picker__main-button'], {
          [styles['date-picker__main-button--active']]: datePickerVisible,
          [styles['date-picker__main-button--error']]: error,
        })}
        id={label}
        type="button"
        onClick={toggleDatePickerVisible}
      >
        <div>
          <img alt="calendar" src={calendar} />
          <Text type="p3">{value ? format(value, 'dd/MM/y') : placeholder}</Text>
        </div>
        <img alt="down-arrow" src={downArrow} />
      </button>
      {error && (
        <Text className={styles['date-picker__error-text']} type="p4">
          {error}
        </Text>
      )}
      {datePickerVisible && (
        <ReactDatePicker
          inline
          showMonthDropdown
          showYearDropdown
          calendarClassName={styles['date-picker__react-date-picker']}
          dayClassName={getDayClassName}
          dropdownMode="select"
          selected={value}
          onChange={date => onChange(date)}
          onSelect={() => setDatePickerVisible(false)}
        />
      )}
    </div>
  );
};
