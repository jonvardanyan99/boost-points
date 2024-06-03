import logo from 'assets/images/logo.svg';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import { useFormik } from 'formik';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useMutation } from 'hooks/useMutation';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from 'services/api';
import { getFormikError } from 'utils/errorHandlers';
import { formatPhoneNumber } from 'utils/formats';
import { loginFormSchema } from 'utils/validators';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import styles from './styles.module.scss';

export const Login = () => {
  const navigate = useNavigate();
  const [login, { loading }] = useMutation(API.login);
  const { handleApiError, snackbar } = useErrorHandler();

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
    },
    validationSchema: toFormikValidationSchema(loginFormSchema),
    onSubmit: async values => {
      try {
        await login({
          phoneNumber: formatPhoneNumber(values.phoneNumber),
        });

        navigate(ROUTES.VERIFICATION, { state: { phoneNumber: values.phoneNumber } });
      } catch (error) {
        handleApiError(error, formik.setFieldError, ['phoneNumber']);
      }
    },
  });

  return (
    <div className={styles.login}>
      <img src={logo} alt="logo" />
      <Text type="h4" className={styles.login__heading}>
        Log in
      </Text>
      <Text type="p4" className={styles.login__instruction}>
        Whenever you log in or creating a new account let’s start with your phone number
      </Text>
      <Input
        type="tel"
        className={styles.login__input}
        placeholder="0432 892 002"
        name="phoneNumber"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={getFormikError(formik, 'phoneNumber')}
      />
      <Button
        className={styles.login__button}
        title="Proceed"
        onClick={formik.handleSubmit}
        loading={loading}
      />
      {snackbar}
    </div>
  );
};
