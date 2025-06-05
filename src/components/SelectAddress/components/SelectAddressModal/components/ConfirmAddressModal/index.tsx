import { useFormik } from 'formik';
import React from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import leftArrow from '~/assets/icons/left-arrow.svg';
import { Button } from '~/components/Button';
import { Dropdown } from '~/components/Dropdown';
import { Input } from '~/components/Input';
import { Modal } from '~/components/Modal';
import { Text } from '~/components/Text';
import { COUNTRY_CODE_OPTIONS, STATE_OPTIONS } from '~/constants/selectOptions';
import { ConfirmAddressModalFormValues } from '~/types/formValues';
import { DraftAddress } from '~/types/models';
import { getFormikError } from '~/utils/errorHandlers';
import { confirmAddressFormSchema } from '~/utils/validators';

import styles from './styles.module.scss';

interface Props {
  visible: boolean;
  onClose: () => void;
  openSelectAddressModal: () => void;
  closeSelectAddressModal: () => void;
  draftAddress: DraftAddress;
  onSelect: (addressData: ConfirmAddressModalFormValues) => void;
}

export const ConfirmAddressModal: React.FC<Props> = ({
  visible,
  openSelectAddressModal,
  closeSelectAddressModal,
  onClose,
  draftAddress,
  onSelect,
}) => {
  const getState = () => {
    const foundState = STATE_OPTIONS.find(option => option.value === draftAddress.state);

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

  const formik = useFormik<ConfirmAddressModalFormValues>({
    initialValues: {
      propertyName: '',
      unitNumber: '',
      streetNumber: draftAddress.streetNumber,
      streetName: draftAddress.streetName,
      streetSuffix: '',
      suburb: draftAddress.suburb,
      state: getState(),
      postcode: +draftAddress.postcode,
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
    <Modal className={styles['confirm-address-modal']} visible={visible}>
      <div className={styles['confirm-address-modal__container']}>
        <button
          className={styles['confirm-address-modal__left-arrow-button']}
          type="button"
          onClick={handleLeftArrowClick}
        >
          <img alt="left-arrow" src={leftArrow} />
        </button>
        <Text type="h4">Confirm address details</Text>
        <Text className={styles['confirm-address-modal__text']} type="p4">
          Check the address details below and fill remaining required fields marked with “*”
        </Text>
        <Input
          error={getFormikError(formik, 'propertyName')}
          label="Property name or lot number *"
          name="propertyName"
          placeholder="Property name or lot number"
          value={formik.values.propertyName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <div className={styles['confirm-address-modal__wrapper']}>
          <Input
            error={getFormikError(formik, 'unitNumber')}
            label="Unit or flat number"
            name="unitNumber"
            placeholder="Unit or flat number"
            value={formik.values.unitNumber}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <Input
            error={getFormikError(formik, 'streetNumber')}
            label="House number"
            name="streetNumber"
            placeholder="House number"
            value={formik.values.streetNumber}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <Input
          error={getFormikError(formik, 'streetName')}
          label="Street name *"
          name="streetName"
          placeholder="Street name"
          value={formik.values.streetName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Input
          className={styles['confirm-address-modal__street-type-input']}
          error={getFormikError(formik, 'streetSuffix')}
          label="Street type *"
          name="streetSuffix"
          placeholder="Street type"
          value={formik.values.streetSuffix}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Input
          error={getFormikError(formik, 'suburb')}
          label="Suburb or town *"
          name="suburb"
          placeholder="Suburb or town"
          value={formik.values.suburb}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <div className={styles['confirm-address-modal__wrapper']}>
          <Dropdown
            className={styles['confirm-address-modal__state-dropdown']}
            error={getFormikError(formik, 'state')}
            label="State *"
            options={STATE_OPTIONS}
            placeholder="Select State"
            selectedOption={formik.values.state}
            onBlur={() => formik.setFieldTouched('state', true, true)}
            onChange={option => formik.setFieldValue('state', option, true)}
          />
          <Input
            className={styles['confirm-address-modal__post-code-input']}
            error={getFormikError(formik, 'postcode')}
            label="Postcode *"
            name="postcode"
            placeholder="Postcode"
            type="number"
            value={formik.values.postcode}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        </div>
        <Dropdown
          className={styles['confirm-address-modal__country-code-dropdown']}
          error={getFormikError(formik, 'countryCode')}
          label="Country code of the country *"
          options={COUNTRY_CODE_OPTIONS}
          placeholder="Select Country Code"
          selectedOption={formik.values.countryCode}
          onBlur={() => formik.setFieldTouched('countryCode', true, true)}
          onChange={option => formik.setFieldValue('countryCode', option, true)}
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
