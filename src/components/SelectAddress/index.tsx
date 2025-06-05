import classNames from 'classnames';
import React, { useState } from 'react';

import rightArrow from '~/assets/icons/right-arrow.svg';
import { Text } from '~/components/Text';
import { ConfirmAddressModalFormValues } from '~/types/formValues';

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
        <Text className={styles['select-address__label-text']} type="p4">
          {label}
        </Text>
      </label>
      <button
        className={classNames(styles['select-address__button'], {
          [styles['select-address__button--error']]: error,
        })}
        id={label}
        type="button"
        onClick={openSelectAddressModal}
      >
        {placeholder}
        <img alt="right-arrow" src={rightArrow} />
      </button>
      {error && (
        <Text className={styles['select-address__error-text']} type="p4">
          {error}
        </Text>
      )}
      <SelectAddressModal
        visible={selectAddressModalVisible}
        onClose={closeSelectAddressModal}
        onOpen={openSelectAddressModal}
        onSelect={onSelect}
      />
    </div>
  );
};
