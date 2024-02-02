import logo from 'assets/images/logo.svg';
import axios from 'axios';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { API_URL } from 'constants/env';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setTokens } from 'store/reducers/auth/actions';
import { handleApiError } from 'utils/errorHandlers';
import { formatPhoneNumber } from 'utils/format';
import { otpSchema } from 'utils/validators';

import styles from './styles.module.scss';

export const Verification = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [inputValue, setInputValue] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [dataLoading, setDataLoading] = useState(false);
  const [resendVisible, setResendVisible] = useState(false);

  useEffect(() => {
    setErrMessage('');
  }, [inputValue]);

  useEffect(() => {
    if (!resendVisible) {
      setTimeout(() => {
        setResendVisible(true);
      }, 30000);
    }
  }, [resendVisible]);

  const phoneNumber = location.state.phoneNumber;
  const contentText = `Enter the verification code we’ve sent to ${phoneNumber}`;

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleProceedClick = async () => {
    const result = otpSchema.safeParse(inputValue);

    if (result.success) {
      setDataLoading(true);

      try {
        const response = await axios.post(`${API_URL}/api/v1/consumers/otp/check`, {
          phoneNumber: formatPhoneNumber(phoneNumber),
          otp: inputValue,
        });

        dispatch(
          setTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          }),
        );
      } catch (error) {
        handleApiError(error, setErrMessage, 'otp');
      } finally {
        setDataLoading(false);
      }
    } else {
      setErrMessage(result.error.issues[0].message);
    }
  };

  const handleResendClick = async () => {
    try {
      await axios.post(`${API_URL}/api/v1/consumers/otp/send`, {
        phoneNumber: formatPhoneNumber(phoneNumber),
      });
    } catch (error) {
      handleApiError(error, setErrMessage, 'phoneNumber');
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
          value={inputValue}
          onChange={handleInputChange}
          error={errMessage}
        />
        <Button
          className={styles.verification__button}
          title="Proceed"
          onClick={handleProceedClick}
          loading={dataLoading}
        />
        {resendVisible && (
          <div className={styles.resend}>
            <Text type="p4">Didn’t get the code?</Text>
            <button type="button" onClick={handleResendClick}>
              <Text type="p4" className={styles.resend__text}>
                Resend
              </Text>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
