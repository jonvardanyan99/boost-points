import logo from 'assets/images/logo.svg';
import axios from 'axios';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { API_URL } from 'constants/env';
import { ROUTES } from 'constants/routes';
import { useFormik } from 'formik';
import { useErrorHandler } from 'hooks/useErrorHandler';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFormikError } from 'utils/errorHandlers';
import { formatPhoneNumber } from 'utils/formats';
import { loginFormSchema } from 'utils/validators';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import styles from './styles.module.scss';

export const Login = () => {
  const [dataLoading, setDataLoading] = useState(false);
  const navigate = useNavigate();
  const { handleApiError, snackbar } = useErrorHandler();

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
    },
    validationSchema: toFormikValidationSchema(loginFormSchema),
    onSubmit: async values => {
      setDataLoading(true);

      try {
        await axios.post(`${API_URL}/api/v1/consumers/otp/send`, {
          phoneNumber: formatPhoneNumber(values.phoneNumber),
        });

        navigate(ROUTES.VERIFICATION, { state: { phoneNumber: values.phoneNumber } });
      } catch (error) {
        handleApiError(error, formik.setFieldError, ['phoneNumber']);
      } finally {
        setDataLoading(false);
      }
    },
  });

  return (
    <div className={styles.login}>
      <div>
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
          loading={dataLoading}
        />
      </div>
      {snackbar}
    </div>
  );
};
