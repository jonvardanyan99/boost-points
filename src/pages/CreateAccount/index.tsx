import logo from 'assets/images/logo.svg';
import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { DatePicker } from 'components/DatePicker';
import { Dropdown } from 'components/Dropdown';
import { Input } from 'components/Input';
import { SelectAddress } from 'components/SelectAddress';
import { Text } from 'components/Text';
import { TERMS_OF_USE_URL } from 'constants/env';
import { GENDER_OPTIONS } from 'constants/selectOptions';
import { format } from 'date-fns/format';
import { useFormik } from 'formik';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useMutation } from 'hooks/useMutation';
import React, { useState } from 'react';
import { API } from 'services/api';
import { useAppDispatch } from 'store/hooks';
import { setData } from 'store/slices/user';
import { CreateAccountFormValues } from 'types/formValues';
import { DeepNonNullable } from 'types/utils';
import { getFormikError } from 'utils/errorHandlers';
import { formatAddressTitle } from 'utils/formats';
import { createAccountFormSchema } from 'utils/validators';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import styles from './styles.module.scss';

export const CreateAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const [previousAddressVisible, setPreviousAddressVisible] = useState(false);
  const [middleNameVisible, setMiddleNameVisible] = useState(false);
  const { handleApiError, snackbar } = useErrorHandler();

  const [createAccount, { loading }] = useMutation(API.createAccount);

  const formik = useFormik<CreateAccountFormValues>({
    initialValues: {
      firstName: '',
      middleName: '',
      surname: '',
      birthDate: null,
      gender: null,
      email: '',
      residentialAddress: null,
      previousAddress: null,
    },
    validationSchema: toFormikValidationSchema(createAccountFormSchema),
    onSubmit: async values => {
      const typedValues = values as DeepNonNullable<CreateAccountFormValues>;

      try {
        const response = await createAccount({
          firstName: typedValues.firstName,
          middleName: typedValues.middleName || null,
          surname: typedValues.surname,
          gender: typedValues.gender.value,
          birthDate: format(typedValues.birthDate, 'y-MM-dd'),
          email: typedValues.email,
          residentialAddress: {
            propertyName: 'Main', // typedValues.residentialAddress.propertyName,
            unitNumber: null, // typedValues.residentialAddress.unitNumber || null,
            streetNumber: '112', // typedValues.residentialAddress.streetNumber,
            streetName: 'MCEVOY', // typedValues.residentialAddress.streetName,
            streetSuffix: 'ST', // typedValues.residentialAddress.streetSuffix,
            suburb: 'ALEXANDRIA', // typedValues.residentialAddress.suburb,
            state: 'NSW', // typedValues.residentialAddress.state.value,
            postcode: '2015', // typedValues.residentialAddress.postcode.toString(),
            countryCode: 'AU', // typedValues.residentialAddress.countryCode.value,
          },
          previousAddress: typedValues.previousAddress
            ? {
                propertyName: typedValues.previousAddress.propertyName,
                unitNumber: typedValues.previousAddress.unitNumber || null,
                streetNumber: typedValues.previousAddress.streetNumber,
                streetName: typedValues.previousAddress.streetName,
                streetSuffix: typedValues.previousAddress.streetSuffix,
                suburb: typedValues.previousAddress.suburb,
                state: typedValues.previousAddress.state.value,
                postcode: typedValues.previousAddress.postcode.toString(),
                countryCode: typedValues.previousAddress.countryCode.value,
              }
            : null,
        });

        if (response) {
          dispatch(setData(response.data));
        }
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
    <div className={styles.page}>
      <img src={logo} alt="logo" />
      <Text type="h4" className={styles.page__heading}>
        Create Account
      </Text>
      <div className={styles.page__content}>
        <Input
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
          className={styles['page__middle-name-toggle']}
          onClick={toggleMiddleNameVisible}
        >
          <Text type="p4" className={styles['page__middle-name-toggle-text']} fontWeight={600}>
            {middleNameVisible ? 'Subtract middle name' : 'Add middle name'}
          </Text>
        </button>
        {middleNameVisible && (
          <Input
            className={styles['page__middle-name-input']}
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
        <div className={styles['page__dropdown-wrapper']}>
          <DatePicker
            className={styles.page__dropdown}
            placeholder="Select"
            value={formik.values.birthDate}
            onChange={option => formik.setFieldValue('birthDate', option, true)}
            onBlur={() => formik.setFieldTouched('birthDate', true, true)}
            label="Date of birth *"
            error={getFormikError(formik, 'birthDate')}
          />
          <Dropdown
            className={styles.page__dropdown}
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
          className={styles['page__select-residential-address']}
          placeholder={
            formatAddressTitle(
              formik.values.residentialAddress as DeepNonNullable<
                typeof formik.values.residentialAddress
              >,
            ) || 'Select Residential Address'
          }
          label="Residential address *"
          onBlur={() => formik.setFieldTouched('residentialAddress', true, true)}
          onSelect={data => formik.setFieldValue('residentialAddress', data, true)}
          error={getFormikError(formik, 'residentialAddress')}
        />
        <Checkbox
          className={styles.page__checkbox}
          checked={previousAddressVisible}
          onChange={setPreviousAddressVisible}
          label="I have lived here for fewer than 2 years"
        />
        {previousAddressVisible && (
          <SelectAddress
            className={styles['page__select-previous-address']}
            placeholder={
              formatAddressTitle(
                formik.values.previousAddress as DeepNonNullable<
                  typeof formik.values.previousAddress
                >,
              ) || 'Select Previous Address'
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
          className={styles['page__main-button']}
          title="Continue"
          onClick={formik.handleSubmit}
          loading={loading}
        />
        <div className={styles['page__terms-container']}>
          <div className={styles['page__terms-wrapper']}>
            <Text type="p3" className={styles['page__terms-text']}>
              By creating account I confirm that I have read and agree with
            </Text>
            <a
              href={TERMS_OF_USE_URL}
              target="_blank"
              className={styles['page__terms-anchor']}
              rel="noreferrer"
            >
              <Text type="p3" className={styles['page__terms-anchor-text']}>
                ScoreUp Terms & Conditions
              </Text>
            </a>
          </div>
        </div>
      </div>
      {snackbar}
    </div>
  );
};
