import React from 'react';

import greenCheckMark from '~/assets/icons/green-check-mark.svg';
import { Button } from '~/components/Button';
import { Modal } from '~/components/Modal';
import { Text } from '~/components/Text';

import styles from './styles.module.scss';

interface Props {
  visible: boolean;
  heading: string;
  message: string;
  secondaryButtonTitle: string;
  secondaryButtonClick: () => void;
  primaryButtonTitle: string;
  primaryButtonClick: () => void;
  hasIcon?: boolean;
}

export const PopupModal: React.FC<Props> = ({
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
    <Modal className={styles['popup-modal']} visible={visible}>
      <div className={styles['popup-modal__container']}>
        <div className={styles['popup-modal__wrapper']}>
          {hasIcon && (
            <div className={styles['popup-modal__icon-wrapper']}>
              <img alt="green-check-mark" src={greenCheckMark} />
            </div>
          )}
          <Text type="h5">{heading}</Text>
          <Text className={styles['popup-modal__message']} type="p3">
            {message}
          </Text>
          <div className={styles['popup-modal__button-wrapper']}>
            <Button
              secondary
              className={styles['popup-modal__button']}
              title={secondaryButtonTitle}
              onClick={secondaryButtonClick}
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
