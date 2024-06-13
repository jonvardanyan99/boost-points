import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { resetStore } from 'store/reducers/app/actions';

import styles from './styles.module.scss';

export const LogoutModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(resetStore());
    onClose();
  };

  return (
    <Modal visible={visible} className={styles['logout-modal']}>
      <div className={styles['logout-modal__container']}>
        <div className={styles['logout-modal__wrapper']}>
          <Text type="h5">Log out</Text>
          <Text type="p3" className={styles['logout-modal__instruction']}>
            Are you sure to log out from your account?
          </Text>
          <div className={styles['logout-modal__button-wrapper']}>
            <Button
              className={styles['logout-modal__button']}
              title="Log out"
              onClick={handleLogoutClick}
              secondary
            />
            <Button className={styles['logout-modal__button']} title="Cancel" onClick={onClose} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

LogoutModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
