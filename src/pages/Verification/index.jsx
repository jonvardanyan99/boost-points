import logo from 'assets/images/logo.svg';
import axios from 'axios';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { API_URL } from 'constants/env';
import { ROUTES } from 'constants/routes';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setTokens } from 'store/reducers/auth/actions';
import { getFormikError, handleApiError } from 'utils/errorHandlers';
import { formatPhoneNumber } from 'utils/formats';
import { verificationFormSchema } from 'utils/validators';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import styles from './styles.module.scss';

export const Verification = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState(false);
  const [resendVisible, setResendVisible] = useState(false);

  const phoneNumber = location.state.phoneNumber;
  const contentText = `Enter the verification code we’ve sent to ${phoneNumber}`;

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: toFormikValidationSchema(verificationFormSchema),
    onSubmit: async values => {
      setDataLoading(true);

      try {
        const response = await axios.post(`${API_URL}/api/v1/consumers/otp/check`, {
          phoneNumber: formatPhoneNumber(phoneNumber),
          otp: values.otp,
        });

        dispatch(
          setTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          }),
        );

        if (response.data.consumer.isNew) {
          navigate(ROUTES.CREATE_ACCOUNT);
        } else {
          // eslint-disable-next-line no-console
          console.log('The consumer is already signed');
        }
      } catch (error) {
        handleApiError(error, formik.setFieldError, ['otp']);
      } finally {
        setDataLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!resendVisible) {
      setTimeout(() => {
        setResendVisible(true);
      }, 30000);
    }
  }, [resendVisible]);

  const handleResendClick = async () => {
    try {
      await axios.post(`${API_URL}/api/v1/consumers/otp/send`, {
        phoneNumber: formatPhoneNumber(phoneNumber),
      });
    } catch (error) {
      handleApiError(error, formik.setFieldError, ['phoneNumber']);
    }

    setResendVisible(false);
  };

  return (
    <div className={styles.verification}>
      <div>
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
          loading={dataLoading}
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
    </div>
  );
};
