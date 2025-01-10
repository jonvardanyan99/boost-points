import classNames from 'classnames';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

export const Badge = ({ className, text }) => {
  return (
    <div className={classNames(styles.badge, className)}>
      <Text type="p6" className={styles.badge__text}>
        {text}
      </Text>
    </div>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};
