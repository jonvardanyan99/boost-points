import logo from 'assets/images/logo.svg';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { useFormik } from 'formik';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useMutation } from 'hooks/useMutation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { API } from 'services/api';
import { setAccount, setTokens } from 'store/reducers/user/actions';
import { getFormikError } from 'utils/errorHandlers';
import { formatPhoneNumber } from 'utils/formats';
import { verificationFormSchema } from 'utils/validators';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import styles from './styles.module.scss';

export const Verification = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [resendVisible, setResendVisible] = useState(false);
  const [verify, { loading }] = useMutation(API.verifyPhoneNumber);
  const { handleApiError, snackbar } = useErrorHandler();

  const phoneNumber = location.state.phoneNumber;
  const contentText = `Enter the verification code we’ve sent to ${phoneNumber}`;

  const formik = useFormik({
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
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          }),
        );
        dispatch(setAccount(response.data.consumer));
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
      <div className={styles.verification__container}>
        <img src={logo} alt="logo" />
        <Text type="h4" className={styles.verification__heading}>
          Phone Verification
        </Text>
        <Text type="p4" className={styles.verification__instruction}>
          {contentText}
        </Text>
        <Input
          className={styles.verification__input}
          placeholder="2423"
          name="otp"
          value={formik.values.otp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getFormikError(formik, 'otp')}
        />
        <Button
          className={styles.verification__button}
          title="Proceed"
          onClick={formik.handleSubmit}
          loading={loading}
        />
        {resendVisible && (
          <div className={styles.verification__resend}>
            <Text type="p4">Didn’t get the code?</Text>
            <button type="button" onClick={handleResendClick}>
              <Text type="p4" className={styles['verification__resend-text']}>
                Resend
              </Text>
            </button>
          </div>
        )}
      </div>
      {snackbar}
    </div>
  );
};
