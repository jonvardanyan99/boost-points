import classNames from 'classnames';
import React from 'react';

import { Text } from '~/components/Text';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  text: string;
}

export const Badge: React.FC<Props> = ({ className, text }) => {
  return (
    <div className={classNames(styles.badge, className)}>
      <Text className={styles.badge__text} type="p6">
        {text}
      </Text>
    </div>
  );
};
