import classNames from 'classnames';
import React from 'react';

import { Text } from '~/components/Text';

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
      <Text className={styles['text-area__label-text']} type="p3">
        {label}
      </Text>
      <textarea
        className={styles['text-area__field']}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
