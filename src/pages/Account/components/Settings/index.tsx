import { format } from 'date-fns';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { DatePicker } from '~/components/DatePicker';
import { Dropdown } from '~/components/Dropdown';
import { Input } from '~/components/Input';
import { SelectAddress } from '~/components/SelectAddress';
import { Text } from '~/components/Text';
import { COUNTRY_CODE_OPTIONS, GENDER_OPTIONS, STATE_OPTIONS } from '~/constants/selectOptions';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { useMutation } from '~/hooks/useMutation';
import { API } from '~/services/api';
import { PatchAccountVariables } from '~/services/api/types/mutations';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setData } from '~/store/slices/user';
import { selectAccount } from '~/store/slices/user/selectors';
import { CreateAccountFormValues } from '~/types/formValues';
import { AccountData } from '~/types/models';
import { DeepNonNullable } from '~/types/utils';
import { getFormikError } from '~/utils/errorHandlers';
import { formatAddressTitle } from '~/utils/formats';
import { diffObjects } from '~/utils/helpers';
import { createAccountFormSchema } from '~/utils/validators';

import styles from './styles.module.scss';

export const Settings: React.FC = () => {
  const account = useAppSelector(selectAccount);
  const typedData = useMemo(() => {
    return account?.data as DeepNonNullable<AccountData, 'middleName' | 'previousAddress'>;
  }, [account]);
  const dispatch = useAppDispatch();
  const [middleNameVisible, setMiddleNameVisible] = useState(!!typedData.middleName);
  const [previousAddressVisible, setPreviousAddressVisible] = useState(!!typedData.previousAddress);
  const { handleApiError, snackbar } = useErrorHandler();

  const [patchAccount, { loading }] = useMutation(API.patchAccount);

  const gender = useMemo(() => {
    return GENDER_OPTIONS.find(option => option.value === typedData.gender);
  }, [typedData.gender]);

  const residentialState = useMemo(() => {
    return STATE_OPTIONS.find(option => option.value === typedData.residentialAddress.state);
  }, [typedData.residentialAddress.state]);

  const residentialCountryCode = useMemo(() => {
    return COUNTRY_CODE_OPTIONS.find(
      option => option.value === typedData.residentialAddress.countryCode,
    );
  }, [typedData.residentialAddress.countryCode]);

  const previousState = useMemo(() => {
    if (typedData.previousAddress) {
      return STATE_OPTIONS.find(option => option.value === typedData.previousAddress?.state);
    }

    return null;
  }, [typedData.previousAddress]);

  const previousCountryCode = useMemo(() => {
    if (typedData.previousAddress) {
      return COUNTRY_CODE_OPTIONS.find(
        option => option.value === typedData.previousAddress?.countryCode,
      );
    }

    return null;
  }, [typedData.previousAddress]);

  const formik = useFormik<CreateAccountFormValues>({
    initialValues: {
      firstName: typedData.firstName,
      middleName: typedData.middleName || '',
      surname: typedData.surname,
      birthDate: new Date(typedData.birthDate),
      gender: gender as NonNullable<typeof gender>,
      email: typedData.email,
      residentialAddress: {
        propertyName: typedData.residentialAddress.propertyName,
        unitNumber: typedData.residentialAddress.unitNumber || '',
        streetNumber: typedData.residentialAddress.streetNumber || '',
        streetName: typedData.residentialAddress.streetName,
        streetSuffix: typedData.residentialAddress.streetSuffix,
        suburb: typedData.residentialAddress.suburb,
        state: residentialState as NonNullable<typeof residentialState>,
        postcode: +typedData.residentialAddress.postcode,
        countryCode: residentialCountryCode as NonNullable<typeof residentialCountryCode>,
      },
      previousAddress: typedData.previousAddress
        ? {
            propertyName: typedData.previousAddress.propertyName,
            unitNumber: typedData.previousAddress.unitNumber || '',
            streetNumber: typedData.previousAddress.streetNumber || '',
            streetName: typedData.previousAddress.streetName,
            streetSuffix: typedData.previousAddress.streetSuffix,
            suburb: typedData.previousAddress.suburb,
            state: previousState as NonNullable<typeof previousState>,
            postcode: +typedData.previousAddress.postcode,
            countryCode: previousCountryCode as NonNullable<typeof previousCountryCode>,
          }
        : null,
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(createAccountFormSchema),
    onSubmit: async values => {
      const { initialValues } = formik;
      const changedData: Partial<CreateAccountFormValues> = diffObjects(values, initialValues);

      const patchData = Object.keys(changedData).reduce<PatchAccountVariables>((acc, key) => {
        const typedKey = key as keyof typeof changedData;

        switch (typedKey) {
          case 'middleName': {
            if (changedData.middleName === '') {
              acc.middleName = null;
            } else {
              acc.middleName = changedData.middleName;
            }

            break;
          }
          case 'birthDate': {
            acc.birthDate = format(
              changedData.birthDate as NonNullable<typeof changedData.birthDate>,
              'y-MM-dd',
            );

            break;
          }
          case 'gender': {
            const typedGender = changedData.gender as NonNullable<typeof changedData.gender>;
            acc.gender = typedGender.value;

            break;
          }
          case 'residentialAddress': {
            const typedResidentialAddress = changedData.residentialAddress as NonNullable<
              typeof changedData.residentialAddress
            >;
            const typedState = typedResidentialAddress.state as NonNullable<
              typeof typedResidentialAddress.state
            >;
            const typedCountryCode = typedResidentialAddress.countryCode as NonNullable<
              typeof typedResidentialAddress.countryCode
            >;

            acc.residentialAddress = {
              ...typedResidentialAddress,
              unitNumber: typedResidentialAddress.unitNumber || null,
              state: typedState.value,
              postcode: typedResidentialAddress.postcode.toString(),
              countryCode: typedCountryCode.value,
            };

            break;
          }
          case 'previousAddress': {
            const typedPreviousAddress = changedData.previousAddress as NonNullable<
              typeof changedData.previousAddress
            >;
            const typedState = typedPreviousAddress.state as NonNullable<
              typeof typedPreviousAddress.state
            >;
            const typedCountryCode = typedPreviousAddress.countryCode as NonNullable<
              typeof typedPreviousAddress.countryCode
            >;

            acc.previousAddress = {
              ...typedPreviousAddress,
              unitNumber: typedPreviousAddress.unitNumber || null,
              state: typedState.value,
              postcode: typedPreviousAddress.postcode.toString(),
              countryCode: typedCountryCode.value,
            };

            break;
          }
          default: {
            acc[typedKey] = changedData[typedKey];
          }
        }

        return acc;
      }, {} as PatchAccountVariables);

      try {
        const response = await patchAccount(patchData);

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
    <div className={styles.settings}>
      <Text fontWeight={600} type="p1">
        Account data
      </Text>
      <Input
        className={styles['settings__first-name-input']}
        error={getFormikError(formik, 'firstName')}
        label="First name *"
        name="firstName"
        placeholder="David"
        value={formik.values.firstName}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <button
        className={styles['settings__middle-name-toggle']}
        type="button"
        onClick={toggleMiddleNameVisible}
      >
        <Text className={styles['settings__middle-name-toggle-text']} fontWeight={600} type="p4">
          {middleNameVisible ? 'Subtract middle name' : 'Add middle name'}
        </Text>
      </button>
      {middleNameVisible && (
        <Input
          className={styles['settings__middle-name-input']}
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
      <div className={styles['settings__fields-wrapper']}>
        <DatePicker
          className={styles['settings__date-picker']}
          error={getFormikError(formik, 'birthDate')}
          label="Date of birth *"
          placeholder="Select"
          value={formik.values.birthDate}
          onBlur={() => formik.setFieldTouched('birthDate', true, true)}
          onChange={option => formik.setFieldValue('birthDate', option, true)}
        />
        <Dropdown
          className={styles.settings__dropdown}
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
        className={styles['settings__select-residential-address']}
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
        className={styles.settings__checkbox}
        label="I have lived here for fewer than 2 years"
        onChange={setPreviousAddressVisible}
      />
      {previousAddressVisible && (
        <SelectAddress
          className={styles['settings__select-previous-address']}
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
        className={styles['settings__main-button']}
        disabled={!formik.dirty}
        loading={loading}
        title="Apply changes"
        onClick={formik.handleSubmit}
      />
      {snackbar}
    </div>
  );
};
