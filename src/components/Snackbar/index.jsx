import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import styles from './styles.module.scss';

export const Snackbar = ({ visible, onClose, text }) => {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (visible) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.snackbar}>
      <Text type="p1" className={styles.snackbar__text}>
        {text}
      </Text>
    </div>
  );
};

Snackbar.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
