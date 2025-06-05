import { useFormik } from 'formik';
import React from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import logo from '~/assets/images/logo.svg';
import { Button } from '~/components/Button';
import { Dropdown } from '~/components/Dropdown';
import { Input } from '~/components/Input';
import { Text } from '~/components/Text';
import { DOCUMENT_TYPE_OPTIONS, STATE_OPTIONS } from '~/constants/selectOptions';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { useMutation } from '~/hooks/useMutation';
import { API } from '~/services/api';
import { useAppDispatch } from '~/store/hooks';
import { unsetNew } from '~/store/slices/user';
import { IdentificationFormValues } from '~/types/formValues';
import { DeepNonNullable } from '~/types/utils';
import { getFormikError } from '~/utils/errorHandlers';
import { identificationFormSchema } from '~/utils/validators';

import styles from './styles.module.scss';

export const Identification: React.FC = () => {
  const dispatch = useAppDispatch();
  const [addId, { loading }] = useMutation(API.addId);
  const { handleApiError, snackbar } = useErrorHandler();

  const formik = useFormik<IdentificationFormValues>({
    initialValues: {
      documentType: null,
      state: null,
      number: '',
    },
    validationSchema: toFormikValidationSchema(identificationFormSchema),
    onSubmit: async values => {
      const typedValues = values as DeepNonNullable<IdentificationFormValues>;

      try {
        await addId({
          documentType: typedValues.documentType.value,
          documentData: {
            number: typedValues.number,
            state: typedValues.state.value,
          },
        });

        dispatch(unsetNew());
      } catch (error) {
        handleApiError(error, formik.setFieldError, ['documentType', 'state', 'number']);
      }
    },
  });

  return (
    <div className={styles.identification}>
      <img alt="logo" src={logo} />
      <Text className={styles.identification__heading} type="h4">
        Identification
      </Text>
      <Text className={styles.identification__instruction} type="p4">
        This info is required by credit organizations to obtain your credit reports
      </Text>
      <div className={styles.identification__content}>
        <Dropdown
          className={styles.identification__field}
          error={getFormikError(formik, 'documentType')}
          label="Document type *"
          options={DOCUMENT_TYPE_OPTIONS}
          placeholder="Select Document Type"
          selectedOption={formik.values.documentType}
          onBlur={() => formik.setFieldTouched('documentType', true, true)}
          onChange={option => formik.setFieldValue('documentType', option, true)}
        />
        <Dropdown
          className={styles.identification__field}
          error={getFormikError(formik, 'state')}
          label="State of issue *"
          options={STATE_OPTIONS}
          placeholder="Select State"
          selectedOption={formik.values.state}
          onBlur={() => formik.setFieldTouched('state', true, true)}
          onChange={option => formik.setFieldValue('state', option, true)}
        />
        <Input
          className={styles.identification__field}
          error={getFormikError(formik, 'number')}
          label="Licence no *"
          name="number"
          placeholder="249004225"
          value={formik.values.number}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <Button
          className={styles['identification__main-button']}
          loading={loading}
          title="Continue"
          onClick={formik.handleSubmit}
        />
      </div>
      {snackbar}
    </div>
  );
};
