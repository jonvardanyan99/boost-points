import logo from 'assets/images/logo.svg';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

export const Login = () => {
  const [inputValue, setInputValue] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    setErrMessage('');
  }, [inputValue]);

  const phoneNumberRegex = /^\d{10}$/;

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleValidation = () => {
    if (phoneNumberRegex.test(inputValue)) {
      // eslint-disable-next-line no-console
      console.log(inputValue);
    } else if (!inputValue) {
      setErrMessage('This field is required');
    } else {
      setErrMessage('Invalid phone number. It should have exactly 10 numeric digits.');
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
          className={styles['login-input']}
          placeholder="0432 892 002"
          value={inputValue}
          onChange={handleInputChange}
          error={errMessage}
        />
        <Button className={styles['login-button']} title="Proceed" onClick={handleValidation} />
      </div>
    </div>
  );
};
