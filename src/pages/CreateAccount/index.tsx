import { format } from 'date-fns/format';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import logo from '~/assets/images/logo.svg';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { DatePicker } from '~/components/DatePicker';
import { Dropdown } from '~/components/Dropdown';
import { Input } from '~/components/Input';
import { SelectAddress } from '~/components/SelectAddress';
import { Text } from '~/components/Text';
import { TERMS_OF_USE_URL } from '~/constants/env';
import { GENDER_OPTIONS } from '~/constants/selectOptions';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { useMutation } from '~/hooks/useMutation';
import { API } from '~/services/api';
import { useAppDispatch } from '~/store/hooks';
import { setData } from '~/store/slices/user';
import { CreateAccountFormValues } from '~/types/formValues';
import { DeepNonNullable } from '~/types/utils';
import { getFormikError } from '~/utils/errorHandlers';
import { formatAddressTitle } from '~/utils/formats';
import { createAccountFormSchema } from '~/utils/validators';

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
      <img alt="logo" src={logo} />
      <Text className={styles.page__heading} type="h4">
        Create Account
      </Text>
      <div className={styles.page__content}>
        <Input
          error={getFormikError(formik, 'firstName')}
          label="First name *"
          name="firstName"
          placeholder="David"
          value={formik.values.firstName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <button
          className={styles['page__middle-name-toggle']}
          type="button"
          onClick={toggleMiddleNameVisible}
        >
          <Text className={styles['page__middle-name-toggle-text']} fontWeight={600} type="p4">
            {middleNameVisible ? 'Subtract middle name' : 'Add middle name'}
          </Text>
        </button>
        {middleNameVisible && (
          <Input
            className={styles['page__middle-name-input']}
            error={getFormikError(formik, 'middleName')}
            label="Middle name"
            name="middleName"
            placeholder="John"
            value={formik.values.middleName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
        )}
        <Input
          error={getFormikError(formik, 'surname')}
          label="Surname *"
          name="surname"
          placeholder="Bryant"
          value={formik.values.surname}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <div className={styles['page__dropdown-wrapper']}>
          <DatePicker
            className={styles.page__dropdown}
            error={getFormikError(formik, 'birthDate')}
            label="Date of birth *"
            placeholder="Select"
            value={formik.values.birthDate}
            onBlur={() => formik.setFieldTouched('birthDate', true, true)}
            onChange={option => formik.setFieldValue('birthDate', option, true)}
          />
          <Dropdown
            className={styles.page__dropdown}
            error={getFormikError(formik, 'gender')}
            label="Gender *"
            options={GENDER_OPTIONS}
            placeholder="Select Gender"
            selectedOption={formik.values.gender}
            onBlur={() => formik.setFieldTouched('gender', true, true)}
            onChange={option => formik.setFieldValue('gender', option, true)}
          />
        </div>
        <SelectAddress
          className={styles['page__select-residential-address']}
          error={getFormikError(formik, 'residentialAddress')}
          label="Residential address *"
          placeholder={
            formatAddressTitle(
              formik.values.residentialAddress as DeepNonNullable<
                typeof formik.values.residentialAddress
              >,
            ) || 'Select Residential Address'
          }
          onBlur={() => formik.setFieldTouched('residentialAddress', true, true)}
          onSelect={data => formik.setFieldValue('residentialAddress', data, true)}
        />
        <Checkbox
          checked={previousAddressVisible}
          className={styles.page__checkbox}
          label="I have lived here for fewer than 2 years"
          onChange={setPreviousAddressVisible}
        />
        {previousAddressVisible && (
          <SelectAddress
            className={styles['page__select-previous-address']}
            error={getFormikError(formik, 'previousAddress')}
            label="Previous address"
            placeholder={
              formatAddressTitle(
                formik.values.previousAddress as DeepNonNullable<
                  typeof formik.values.previousAddress
                >,
              ) || 'Select Previous Address'
            }
            onBlur={() => formik.setFieldTouched('previousAddress', true, true)}
            onSelect={data => formik.setFieldValue('previousAddress', data, true)}
          />
        )}
        <Input
          error={getFormikError(formik, 'email')}
          label="Email *"
          name="email"
          placeholder="david_bryant@mail.com"
          type="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Button
          className={styles['page__main-button']}
          loading={loading}
          title="Continue"
          onClick={formik.handleSubmit}
        />
        <div className={styles['page__terms-container']}>
          <div className={styles['page__terms-wrapper']}>
            <Text className={styles['page__terms-text']} type="p3">
              By creating account I confirm that I have read and agree with
            </Text>
            <a
              className={styles['page__terms-anchor']}
              href={TERMS_OF_USE_URL}
              rel="noreferrer"
              target="_blank"
            >
              <Text className={styles['page__terms-anchor-text']} type="p3">
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
