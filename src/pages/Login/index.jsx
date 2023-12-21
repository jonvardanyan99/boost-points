import logo from 'assets/images/logo.svg';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Text } from 'components/Text';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';

import styles from './styles.module.scss';

export const Login = () => {
  const [inputValue, setInputValue] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    setErrMessage('');
  }, [inputValue]);

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleValidation = () => {
    const schema = z
      .string()
      .min(1, 'This field is required')
      .length(10, 'Invalid phone number')
      .regex(/^[0-9]+$/, 'Invalid phone number');

    const result = schema.safeParse(inputValue);

    if (!result.success) {
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
        <Button className={styles['login-button']} title="Proceed" onClick={handleValidation} />
      </div>
    </div>
  );
};
