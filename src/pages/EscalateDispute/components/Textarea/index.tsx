import classNames from 'classnames';
import { Text } from 'components/Text';
import React from 'react';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: React.FC<Props> = ({
  className,
  label,
  placeholder,
  name,
  value,
  onChange,
}) => {
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
