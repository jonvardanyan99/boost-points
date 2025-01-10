import greenCheckMark from 'assets/icons/green-check-mark.svg';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

export const PopupModal = ({
  visible,
  heading,
  message,
  secondaryButtonTitle,
  secondaryButtonClick,
  primaryButtonTitle,
  primaryButtonClick,
  hasIcon,
}) => {
  return (
    <Modal visible={visible} className={styles['popup-modal']}>
      <div className={styles['popup-modal__container']}>
        <div className={styles['popup-modal__wrapper']}>
          {hasIcon && (
            <div className={styles['popup-modal__icon-wrapper']}>
              <img src={greenCheckMark} alt="green-check-mark" />
            </div>
          )}
          <Text type="h5">{heading}</Text>
          <Text type="p3" className={styles['popup-modal__message']}>
            {message}
          </Text>
          <div className={styles['popup-modal__button-wrapper']}>
            <Button
              className={styles['popup-modal__button']}
              title={secondaryButtonTitle}
              onClick={secondaryButtonClick}
              secondary
            />
            <Button
              className={styles['popup-modal__button']}
              title={primaryButtonTitle}
              onClick={primaryButtonClick}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

PopupModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  secondaryButtonTitle: PropTypes.string.isRequired,
  secondaryButtonClick: PropTypes.func.isRequired,
  primaryButtonTitle: PropTypes.string.isRequired,
  primaryButtonClick: PropTypes.func.isRequired,
  hasIcon: PropTypes.bool,
};
