import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { DatePicker } from 'components/DatePicker';
import { Dropdown } from 'components/Dropdown';
import { Input } from 'components/Input';
import { SelectAddress } from 'components/SelectAddress';
import { Text } from 'components/Text';
import { COUNTRY_CODE_OPTIONS, GENDER_OPTIONS, STATE_OPTIONS } from 'constants/selectOptions';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useMutation } from 'hooks/useMutation';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API } from 'services/api';
import { setData } from 'store/reducers/user/actions';
import { selectAccount } from 'store/reducers/user/selectors';
import { getFormikError } from 'utils/errorHandlers';
import { formatAddressTitle } from 'utils/formats';
import { diffObjects } from 'utils/helpers';
import { createAccountFormSchema } from 'utils/validators';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import styles from './styles.module.scss';

export const Settings = () => {
  const account = useSelector(selectAccount);
  const dispatch = useDispatch();
  const [middleNameVisible, setMiddleNameVisible] = useState(!!account.data.middleName);
  const [previousAddressVisible, setPreviousAddressVisible] = useState(
    !!account.data.previousAddress,
  );
  const { handleApiError, snackbar } = useErrorHandler();

  const [patchAccount, { loading }] = useMutation(API.patchAccount);

  const gender = useMemo(() => {
    return GENDER_OPTIONS.find(option => option.value === account.data.gender);
  }, [account.data.gender]);

  const residentialState = useMemo(() => {
    return STATE_OPTIONS.find(option => option.value === account.data.residentialAddress.state);
  }, [account.data.residentialAddress.state]);

  const residentialCountryCode = useMemo(() => {
    return COUNTRY_CODE_OPTIONS.find(
      option => option.value === account.data.residentialAddress.countryCode,
    );
  }, [account.data.residentialAddress.countryCode]);

  const previousState = useMemo(() => {
    if (account.data.previousAddress) {
      return STATE_OPTIONS.find(option => option.value === account.data.previousAddress.state);
    }

    return null;
  }, [account.data.previousAddress]);

  const previousCountryCode = useMemo(() => {
    if (account.data.previousAddress) {
      return COUNTRY_CODE_OPTIONS.find(
        option => option.value === account.data.previousAddress.countryCode,
      );
    }

    return null;
  }, [account.data.previousAddress]);

  const formik = useFormik({
    initialValues: {
      firstName: account.data.firstName,
      middleName: account.data.middleName || '',
      surname: account.data.surname,
      birthDate: new Date(account.data.birthDate),
      gender,
      email: account.data.email,
      residentialAddress: {
        propertyName: account.data.residentialAddress.propertyName,
        unitNumber: account.data.residentialAddress.unitNumber || '',
        streetNumber: account.data.residentialAddress.streetNumber || '',
        streetName: account.data.residentialAddress.streetName,
        streetSuffix: account.data.residentialAddress.streetSuffix,
        suburb: account.data.residentialAddress.suburb,
        state: residentialState,
        postcode: +account.data.residentialAddress.postcode,
        countryCode: residentialCountryCode,
      },
      previousAddress: account.data.previousAddress
        ? {
            propertyName: account.data.previousAddress.propertyName,
            unitNumber: account.data.previousAddress.unitNumber || '',
            streetNumber: account.data.previousAddress.streetNumber || '',
            streetName: account.data.previousAddress.streetName,
            streetSuffix: account.data.previousAddress.streetSuffix,
            suburb: account.data.previousAddress.suburb,
            state: previousState,
            postcode: +account.data.previousAddress.postcode,
            countryCode: previousCountryCode,
          }
        : null,
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(createAccountFormSchema),
    onSubmit: async values => {
      const { initialValues } = formik;
      const changedData = diffObjects(values, initialValues);

      if (changedData.middleName === '') {
        changedData.middleName = null;
      }

      if (changedData.birthDate) {
        changedData.birthDate = format(changedData.birthDate, 'y-MM-dd');
      }

      if (changedData.gender) {
        changedData.gender = changedData.gender.value;
      }

      if (changedData.residentialAddress) {
        changedData.residentialAddress = {
          ...changedData.residentialAddress,
          unitNumber: changedData.residentialAddress.unitNumber || null,
          state: changedData.residentialAddress.state.value,
          postcode: changedData.residentialAddress.postcode.toString(),
          countryCode: changedData.residentialAddress.countryCode.value,
        };
      }

      if (changedData.previousAddress) {
        changedData.previousAddress = {
          ...changedData.previousAddress,
          unitNumber: changedData.previousAddress.unitNumber || null,
          state: changedData.previousAddress.state.value,
          postcode: changedData.previousAddress.postcode.toString(),
          countryCode: changedData.previousAddress.countryCode.value,
        };
      }

      try {
        const response = await patchAccount(changedData);

        dispatch(setData(response.data));
      } catch (error) {
        handleApiError(error, formik.setFieldError, [
          'firstName',
          'middleName',
          'surname',
          'birthDate',
          'gender',
          'email',
        ]);
      }
    },
  });

  const toggleMiddleNameVisible = () => {
    setMiddleNameVisible(prevValue => !prevValue);
  };

  return (
    <div className={styles.settings}>
      <Text type="p1" fontWeight={600}>
        Account data
      </Text>
      <Input
        className={styles['settings__first-name-input']}
        placeholder="David"
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label="First name *"
        error={getFormikError(formik, 'firstName')}
      />
      <button
        type="button"
        className={styles['settings__middle-name-toggle']}
        onClick={toggleMiddleNameVisible}
      >
        <Text type="p4" className={styles['settings__middle-name-toggle-text']} fontWeight={600}>
          {middleNameVisible ? 'Subtract middle name' : 'Add middle name'}
        </Text>
      </button>
      {middleNameVisible && (
        <Input
          className={styles['settings__middle-name-input']}
          placeholder="John"
          name="middleName"
          value={formik.values.middleName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Middle name"
          error={getFormikError(formik, 'middleName')}
        />
      )}
      <Input
        placeholder="Bryant"
        name="surname"
        value={formik.values.surname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label="Surname *"
        error={getFormikError(formik, 'surname')}
      />
      <div className={styles['settings__fields-wrapper']}>
        <DatePicker
          className={styles['settings__date-picker']}
          placeholder="Select"
          value={formik.values.birthDate}
          onChange={option => formik.setFieldValue('birthDate', option, true)}
          onBlur={() => formik.setFieldTouched('birthDate', true, true)}
          label="Date of birth *"
          error={getFormikError(formik, 'birthDate')}
        />
        <Dropdown
          className={styles.settings__dropdown}
          placeholder="Select Gender"
          selectedOption={formik.values.gender}
          onChange={option => formik.setFieldValue('gender', option, true)}
          onBlur={() => formik.setFieldTouched('gender', true, true)}
          options={GENDER_OPTIONS}
          label="Gender *"
          error={getFormikError(formik, 'gender')}
        />
      </div>
      <SelectAddress
        className={styles['settings__select-residential-address']}
        placeholder={
          formatAddressTitle(formik.values.residentialAddress) || 'Select Residential Address'
        }
        label="Residential address *"
        onBlur={() => formik.setFieldTouched('residentialAddress', true, true)}
        onSelect={data => formik.setFieldValue('residentialAddress', data, true)}
        error={getFormikError(formik, 'residentialAddress')}
      />
      <Checkbox
        className={styles.settings__checkbox}
        checked={previousAddressVisible}
        onChange={setPreviousAddressVisible}
        label="I have lived here for fewer than 2 years"
      />
      {previousAddressVisible && (
        <SelectAddress
          className={styles['settings__select-previous-address']}
          placeholder={
            formatAddressTitle(formik.values.previousAddress) || 'Select Previous Address'
          }
          label="Previous address"
          onBlur={() => formik.setFieldTouched('previousAddress', true, true)}
          onSelect={data => formik.setFieldValue('previousAddress', data, true)}
          error={getFormikError(formik, 'previousAddress')}
        />
      )}
      <Input
        type="email"
        placeholder="david_bryant@mail.com"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        label="Email *"
        error={getFormikError(formik, 'email')}
      />
      <Button
        className={styles['settings__main-button']}
        title="Apply changes"
        onClick={formik.handleSubmit}
        loading={loading}
        disabled={!formik.dirty}
      />
      {snackbar}
    </div>
  );
};
