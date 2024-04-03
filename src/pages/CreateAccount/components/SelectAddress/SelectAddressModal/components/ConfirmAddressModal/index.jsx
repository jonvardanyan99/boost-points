import leftArrow from 'assets/images/left-arrow.svg';
import { Button } from 'components/Button';
import { Dropdown } from 'components/Dropdown';
import { Input } from 'components/Input';
import { Modal } from 'components/Modal';
import { Text } from 'components/Text';
import { COUNTRY_CODE_OPTIONS, STATES_OPTIONS } from 'constants/selectOptions';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { getFormikError } from 'utils/errorHandlers';
import { confirmAddressFormSchema } from 'utils/validators';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import styles from './styles.module.scss';

export const ConfirmAddressModal = ({
  visible,
  openSelectAddressModal,
  closeSelectAddressModal,
  onClose,
  draftAddress,
  onSelect,
}) => {
  const getState = () => {
    const foundState = STATES_OPTIONS.find(option => option.value === draftAddress.state);

    if (foundState) {
      return foundState;
    }

    return null;
  };

  const getCountryCode = () => {
    const foundCountryCode = COUNTRY_CODE_OPTIONS.find(
      option => option.value === draftAddress.countryCode,
    );

    if (foundCountryCode) {
      return foundCountryCode;
    }

    return null;
  };

  const formik = useFormik({
    initialValues: {
      propertyName: '',
      unitNumber: '',
      streetNumber: draftAddress.streetNumber || '',
      streetName: draftAddress.streetName || '',
      streetSuffix: '',
      suburb: draftAddress.suburb || '',
      state: getState(),
      postcode: draftAddress.postcode || '',
      countryCode: getCountryCode(),
    },
    validationSchema: toFormikValidationSchema(confirmAddressFormSchema),
    onSubmit: values => {
      onSelect(values);

      onClose();
      closeSelectAddressModal();
    },
  });

  const handleLeftArrowClick = () => {
    onClose();
    openSelectAddressModal();
  };

  return (
    <Modal visible={visible} className={styles['confirm-address-modal']}>
      <div className={styles['confirm-address-modal__container']}>
        <button
          type="button"
          className={styles['confirm-address-modal__left-arrow-button']}
          onClick={handleLeftArrowClick}
        >
          <img src={leftArrow} alt="left-arrow" />
        </button>
        <Text type="h4">Confirm address details</Text>
        <Text type="p4" className={styles['confirm-address-modal__text']}>
          Check the address details below and fill remaining required fields marked with “*”
        </Text>
        <Input
          placeholder="Property name or lot number"
          name="propertyName"
          value={formik.values.propertyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Property name or lot number *"
          error={getFormikError(formik, 'propertyName')}
        />
        <div className={styles['confirm-address-modal__wrapper']}>
          <Input
            placeholder="Unit or flat number"
            name="unitNumber"
            value={formik.values.unitNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Unit or flat number"
            error={getFormikError(formik, 'unitNumber')}
          />
          <Input
            placeholder="House number"
            name="streetNumber"
            value={formik.values.streetNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="House number"
            error={getFormikError(formik, 'streetNumber')}
          />
        </div>
        <Input
          placeholder="Street name"
          name="streetName"
          value={formik.values.streetName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Street name *"
          error={getFormikError(formik, 'streetName')}
        />
        <Input
          className={styles['confirm-address-modal__street-type-input']}
          placeholder="Street type"
          name="streetSuffix"
          value={formik.values.streetSuffix}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Street type *"
          error={getFormikError(formik, 'streetSuffix')}
        />
        <Input
          placeholder="Suburb or town"
          name="suburb"
          value={formik.values.suburb}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Suburb or town *"
          error={getFormikError(formik, 'suburb')}
        />
        <div className={styles['confirm-address-modal__wrapper']}>
          <Dropdown
            className={styles['confirm-address-modal__state-dropdown']}
            placeholder="Select State"
            selectedOption={formik.values.state}
            onChange={option => formik.setFieldValue('state', option, true)}
            onBlur={() => formik.setFieldTouched('state', true, true)}
            options={STATES_OPTIONS}
            label="State *"
            error={getFormikError(formik, 'state')}
          />
          <Input
            className={styles['confirm-address-modal__post-code-input']}
            type="number"
            placeholder="Postcode"
            name="postcode"
            value={formik.values.postcode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Postcode *"
            error={getFormikError(formik, 'postcode')}
          />
        </div>
        <Dropdown
          className={styles['confirm-address-modal__country-code-dropdown']}
          placeholder="Select Country Code"
          selectedOption={formik.values.countryCode}
          onChange={option => formik.setFieldValue('countryCode', option, true)}
          onBlur={() => formik.setFieldTouched('countryCode', true, true)}
          options={COUNTRY_CODE_OPTIONS}
          label="Country code of the country *"
          error={getFormikError(formik, 'countryCode')}
        />
        <Button
          className={styles['confirm-address-modal__button']}
          title="Save"
          onClick={formik.handleSubmit}
        />
      </div>
    </Modal>
  );
};

ConfirmAddressModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  openSelectAddressModal: PropTypes.func.isRequired,
  closeSelectAddressModal: PropTypes.func.isRequired,
  draftAddress: PropTypes.shape({}).isRequired,
  onSelect: PropTypes.func.isRequired,
};
