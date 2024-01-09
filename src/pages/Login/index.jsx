import logo from 'assets/images/logo.svg';
import axios from 'axios';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import { API_URL } from 'constants/env';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from 'utils/errorHandlers';
import { formatPhoneNumber } from 'utils/format';
import { phoneNumberSchema } from 'utils/validators';

import styles from './styles.module.scss';

export const Login = () => {
  const [inputValue, setInputValue] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [dataLoading, setDataLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setErrMessage('');
  }, [inputValue]);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleProceed = async () => {
    const result = phoneNumberSchema.safeParse(inputValue);

    if (result.success) {
      setDataLoading(true);

      try {
        const response = await axios.post(`${API_URL}/api/v1/consumers/otp/send`, {
          phoneNumber: formatPhoneNumber(inputValue),
        });
        // eslint-disable-next-line no-console
        console.log(response);

        // eslint-disable-next-line no-console
        navigate('/verification', { state: { phoneNumber: inputValue } });
      } catch (error) {
        handleApiError(error, setErrMessage, 'phoneNumber');
      } finally {
        setDataLoading(false);
      }
    } else {
      setErrMessage(result.error.issues[0].message);
    }
  };

  return (
    <div className={styles.login}>
      <div>
        <img src={logo} alt="logo" />
        <Text type="h4" className={styles.heading}>
          Log in
        </Text>
        <Text type="p4" className={styles['login-instruction']}>
          Whenever you log in or creating a new account let’s start with your phone number
        </Text>
        <Input
          type="tel"
          className={styles['login-input']}
          placeholder="0432 892 002"
          value={inputValue}
          onChange={handleInputChange}
          error={errMessage}
        />
        <Button
          className={styles['login-button']}
          title="Proceed"
          onClick={handleProceed}
          loading={dataLoading}
        />
      </div>
    </div>
  );
};
