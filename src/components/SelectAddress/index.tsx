import rightArrow from 'assets/icons/right-arrow.svg';
import classNames from 'classnames';
import { Text } from 'components/Text';
import React, { useState } from 'react';
import { ConfirmAddressModalFormValues } from 'types/formValues';

import { SelectAddressModal } from './components/SelectAddressModal';
import styles from './styles.module.scss';

interface Props {
  className?: string;
  placeholder: string;
  label: string;
  onBlur: () => void;
  onSelect: (addressData: ConfirmAddressModalFormValues) => void;
  error?: string | null;
}

export const SelectAddress: React.FC<Props> = ({
  className,
  placeholder,
  label,
  onBlur,
  onSelect,
  error,
}) => {
  const [selectAddressModalVisible, setSelectAddressModalVisible] = useState(false);

  const openSelectAddressModal = () => {
    setSelectAddressModalVisible(true);
  };

  const closeSelectAddressModal = () => {
    setSelectAddressModalVisible(false);
    onBlur();
  };

  return (
    <div className={classNames(styles['select-address'], className)}>
      <label htmlFor={label}>
        <Text type="p4" className={styles['select-address__label-text']}>
          {label}
        </Text>
      </label>
      <button
        type="button"
        id={label}
        className={classNames(styles['select-address__button'], {
          [styles['select-address__button--error']]: error,
        })}
        onClick={openSelectAddressModal}
      >
        {placeholder}
        <img src={rightArrow} alt="right-arrow" />
      </button>
      {error && (
        <Text type="p4" className={styles['select-address__error-text']}>
          {error}
        </Text>
      )}
      <SelectAddressModal
        visible={selectAddressModalVisible}
        onOpen={openSelectAddressModal}
        onClose={closeSelectAddressModal}
        onSelect={onSelect}
      />
    </div>
  );
};
