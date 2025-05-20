import classNames from 'classnames';
import { Text } from 'components/Text';
import React from 'react';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  text: string;
}

export const Badge: React.FC<Props> = ({ className, text }) => {
  return (
    <div className={classNames(styles.badge, className)}>
      <Text type="p6" className={styles.badge__text}>
        {text}
      </Text>
    </div>
  );
};
