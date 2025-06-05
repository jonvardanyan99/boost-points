import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import logo from '~/assets/images/logo.svg';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Text } from '~/components/Text';
import { ROUTES } from '~/constants/routes';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { useMutation } from '~/hooks/useMutation';
import { API } from '~/services/api';
import { LoginResponse, LoginVariables } from '~/services/api/types/mutations';
import { getFormikError } from '~/utils/errorHandlers';
import { formatPhoneNumber } from '~/utils/formats';
import { loginFormSchema } from '~/utils/validators';

import styles from './styles.module.scss';

interface LoginFormValues {
  phoneNumber: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login, { loading }] = useMutation<LoginVariables, LoginResponse>(API.login);
  const { handleApiError, snackbar } = useErrorHandler();

  const formik = useFormik<LoginFormValues>({
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
      <img alt="logo" src={logo} />
      <Text className={styles.login__heading} type="h4">
        Log in
      </Text>
      <Text className={styles.login__instruction} type="p4">
        Whenever you log in or creating a new account let’s start with your phone number
      </Text>
      <Input
        className={styles.login__input}
        error={getFormikError<LoginFormValues>(formik, 'phoneNumber')}
        name="phoneNumber"
        placeholder="0432 892 002"
        type="tel"
        value={formik.values.phoneNumber}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <Button
        className={styles.login__button}
        loading={loading}
        title="Proceed"
        onClick={formik.handleSubmit}
      />
      {snackbar}
    </div>
  );
};
