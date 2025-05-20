import 'react-circular-progressbar/dist/styles.css';

import classNames from 'classnames';
import { Text } from 'components/Text';
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  width?: string;
  height?: string;
  value: number;
  maxValue: number;
}

export const Progressbar: React.FC<Props> = ({
  className,
  width = '178px',
  height = '178px',
  value,
  maxValue,
}) => {
  const maxValueText = `out of ${maxValue.toLocaleString('en-US')}`;

  return (
    <div className={classNames(styles.progressbar, className)}>
      <CircularProgressbar
        value={value}
        maxValue={maxValue}
        strokeWidth={9}
        styles={{
          root: { width, height },
          path: { stroke: 'rgb(var(--green-color))' },
          trail: { stroke: 'rgb(var(--gray-7-color))' },
        }}
      />
      <div className={styles['progressbar__text-wrapper']}>
        <Text type="h4">{value}</Text>
        <Text type="p5" className={styles['progressbar__max-value-text']}>
          {maxValueText}
        </Text>
      </div>
    </div>
  );
};
