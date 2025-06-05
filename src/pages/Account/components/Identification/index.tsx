import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { Button } from '~/components/Button';
import { Dropdown } from '~/components/Dropdown';
import { Input } from '~/components/Input';
import { Loader } from '~/components/Loader';
import { Text } from '~/components/Text';
import { DOCUMENT_TYPE_OPTIONS, STATE_OPTIONS } from '~/constants/selectOptions';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { useMutation } from '~/hooks/useMutation';
import { useQuery } from '~/hooks/useQuery';
import { API } from '~/services/api';
import { IdentificationFormValues } from '~/types/formValues';
import { DeepNonNullable } from '~/types/utils';
import { getFormikError } from '~/utils/errorHandlers';
import { diffObjects } from '~/utils/helpers';
import { identificationFormSchema } from '~/utils/validators';

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
          <Text className={styles.identification__title} fontWeight={600} type="p1">
            Identification
          </Text>
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
            disabled={!formik.dirty}
            loading={loading}
            title="Apply changes"
            onClick={formik.handleSubmit}
          />
          {snackbar}
        </>
      )}
    </div>
  );
};
