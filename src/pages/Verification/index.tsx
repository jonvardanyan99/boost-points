import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import logo from '~/assets/images/logo.svg';
import { Button } from '~/components/Button';
import { Input } from '~/components/Input';
import { Text } from '~/components/Text';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { useMutation } from '~/hooks/useMutation';
import { API } from '~/services/api';
import { useAppDispatch } from '~/store/hooks';
import { setAccount, setTokens } from '~/store/slices/user';
import { VerificationFormValues } from '~/types/formValues';
import { AccountData } from '~/types/models';
import { getFormikError } from '~/utils/errorHandlers';
import { formatPhoneNumber } from '~/utils/formats';
import { verificationFormSchema } from '~/utils/validators';

import styles from './styles.module.scss';

export const Verification: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [resendVisible, setResendVisible] = useState(false);
  const { handleApiError, snackbar } = useErrorHandler();

  const [verify, { loading }] = useMutation(API.verifyPhoneNumber);

  const phoneNumber = location.state?.phoneNumber;
  const contentText = `Enter the verification code we’ve sent to ${phoneNumber}`;

  const formik = useFormik<VerificationFormValues>({
    initialValues: {
      otp: '',
    },
    validationSchema: toFormikValidationSchema(verificationFormSchema),
    onSubmit: async values => {
      try {
        const response = await verify({
          phoneNumber: formatPhoneNumber(phoneNumber),
          otp: values.otp,
        });

        dispatch(
          setTokens({
            accessToken: response?.data.accessToken as string,
            refreshToken: response?.data.refreshToken as string,
          }),
        );
        dispatch(
          setAccount({
            data: response?.data.consumer as AccountData,
            isConsentFormSigned: response?.data.isConsentFormSigned as boolean,
          }),
        );
      } catch (error) {
        handleApiError(error, formik.setFieldError, ['otp']);
      }
    },
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!resendVisible) {
      const timeoutId = setTimeout(() => {
        setResendVisible(true);
      }, 30000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [resendVisible]);

  const handleResendClick = async () => {
    try {
      await API.login({
        phoneNumber: formatPhoneNumber(phoneNumber),
      });
    } catch (error) {
      handleApiError(error);
    }

    setResendVisible(false);
  };

  return (
    <div className={styles.verification}>
      <img alt="logo" src={logo} />
      <Text className={styles.verification__heading} type="h4">
        Phone Verification
      </Text>
      <Text className={styles.verification__instruction} type="p4">
        {contentText}
      </Text>
      <Input
        className={styles.verification__input}
        error={getFormikError(formik, 'otp')}
        name="otp"
        placeholder="2423"
        value={formik.values.otp}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
      />
      <Button
        className={styles.verification__button}
        loading={loading}
        title="Proceed"
        onClick={formik.handleSubmit}
      />
      {resendVisible && (
        <div className={styles.verification__resend}>
          <Text type="p4">Didn’t get the code?</Text>
          <button type="button" onClick={handleResendClick}>
            <Text className={styles['verification__resend-text']} type="p4">
              Resend
            </Text>
          </button>
        </div>
      )}
      {snackbar}
    </div>
  );
};
