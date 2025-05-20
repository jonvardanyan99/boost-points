import { Button } from 'components/Button';
import { Dropdown } from 'components/Dropdown';
import { Input } from 'components/Input';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { DOCUMENT_TYPE_OPTIONS, STATE_OPTIONS } from 'constants/selectOptions';
import { useFormik } from 'formik';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useMutation } from 'hooks/useMutation';
import { useQuery } from 'hooks/useQuery';
import React, { useEffect } from 'react';
import { API } from 'services/api';
import { IdentificationFormValues } from 'types/formValues';
import { DeepNonNullable } from 'types/utils';
import { getFormikError } from 'utils/errorHandlers';
import { diffObjects } from 'utils/helpers';
import { identificationFormSchema } from 'utils/validators';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import styles from './styles.module.scss';

export const Identification: React.FC = () => {
  const [addId, { loading }] = useMutation(API.addId);
  const { handleApiError, snackbar } = useErrorHandler();

  const { data, loading: dataLoading } = useQuery({ requestFn: API.getId });

  const formik = useFormik<IdentificationFormValues>({
    initialValues: {
      documentType: null,
      state: null,
      number: '',
    },
    validationSchema: toFormikValidationSchema(identificationFormSchema),
    onSubmit: async values => {
      const { initialValues, resetForm } = formik;
      const changedData: Partial<IdentificationFormValues> = diffObjects(values, initialValues);

      const typedValues = values as DeepNonNullable<IdentificationFormValues>;

      try {
        await addId({
          documentType: typedValues.documentType.value,
          documentData: {
            number: typedValues.number,
            state: typedValues.state.value,
          },
        });

        resetForm({ values: { ...initialValues, ...changedData } });
      } catch (error) {
        handleApiError(error, formik.setFieldError, ['documentType', 'state', 'number']);
      }
    },
  });

  useEffect(() => {
    if (data) {
      const documentType =
        DOCUMENT_TYPE_OPTIONS.find(option => option.value === data.documentType) || null;
      const state = STATE_OPTIONS.find(option => option.value === data.documentData.state) || null;
      const number = data.documentData.number;

      formik.resetForm({ values: { documentType, state, number } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className={styles.identification}>
      {dataLoading ? (
        <Loader secondary size={20} />
      ) : (
        <>
          <Text type="p1" fontWeight={600} className={styles.identification__title}>
            Identification
          </Text>
          <Dropdown
            className={styles.identification__field}
            placeholder="Select Document Type"
            selectedOption={formik.values.documentType}
            onChange={option => formik.setFieldValue('documentType', option, true)}
            onBlur={() => formik.setFieldTouched('documentType', true, true)}
            options={DOCUMENT_TYPE_OPTIONS}
            label="Document type *"
            error={getFormikError(formik, 'documentType')}
          />
          <Dropdown
            className={styles.identification__field}
            placeholder="Select State"
            selectedOption={formik.values.state}
            onChange={option => formik.setFieldValue('state', option, true)}
            onBlur={() => formik.setFieldTouched('state', true, true)}
            options={STATE_OPTIONS}
            label="State of issue *"
            error={getFormikError(formik, 'state')}
          />
          <Input
            placeholder="249004225"
            name="number"
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Licence no *"
            error={getFormikError(formik, 'number')}
          />
          <Button
            className={styles['identification__main-button']}
            title="Apply changes"
            onClick={formik.handleSubmit}
            loading={loading}
            disabled={!formik.dirty}
          />
          {snackbar}
        </>
      )}
    </div>
  );
};
