import rightArrow from 'assets/images/right-arrow.svg';
import classNames from 'classnames';
import { Text } from 'components/Text';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { SelectAddressModal } from './SelectAddressModal';
import styles from './styles.module.scss';

export const SelectAddress = ({ placeholder, label, onBlur, onSelect, error }) => {
  const [selectAddressModalVisible, setSelectAddressModalVisible] = useState(false);

  const openSelectAddressModal = () => {
    setSelectAddressModalVisible(true);
  };

  const closeSelectAddressModal = () => {
    setSelectAddressModalVisible(false);
    onBlur();
  };

  return (
    <div className={styles['select-address']}>
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

SelectAddress.propTypes = {
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  error: PropTypes.string,
};
