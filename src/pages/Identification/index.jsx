import logo from 'assets/images/logo.svg';
import { Button } from 'components/Button';
import { Dropdown } from 'components/Dropdown';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { DOCUMENT_TYPE_OPTIONS, STATE_OPTIONS } from 'constants/selectOptions';
import { useFormik } from 'formik';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useMutation } from 'hooks/useMutation';
import React from 'react';
import { useDispatch } from 'react-redux';
import { API } from 'services/api';
import { unsetNew } from 'store/slices/user';
import { getFormikError } from 'utils/errorHandlers';
import { identificationFormSchema } from 'utils/validators';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import styles from './styles.module.scss';

export const Identification = () => {
  const dispatch = useDispatch();
  const [addId, { loading }] = useMutation(API.addId);
  const { handleApiError, snackbar } = useErrorHandler();

  const formik = useFormik({
    initialValues: {
      documentType: null,
      state: null,
      number: '',
    },
    validationSchema: toFormikValidationSchema(identificationFormSchema),
    onSubmit: async values => {
      try {
        await addId({
          documentType: values.documentType.value,
          documentData: {
            number: values.number,
            state: values.state.value,
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
      <img src={logo} alt="logo" />
      <Text type="h4" className={styles.identification__heading}>
        Identification
      </Text>
      <Text type="p4" className={styles.identification__instruction}>
        This info is required by credit organizations to obtain your credit reports
      </Text>
      <div className={styles.identification__content}>
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
          className={styles.identification__field}
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
          title="Continue"
          onClick={formik.handleSubmit}
          loading={loading}
        />
      </div>
      {snackbar}
    </div>
  );
};
