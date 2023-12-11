import { React, useState } from 'react';

import logo from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Text } from '../../components/Text';
import styles from './styles.module.scss';

export const Login = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = event => {
    setInputValue(event.target.value);
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
        />
        <Button className={styles['login-button']} title="Proceed" onClick={() => {}} />
      </div>
    </div>
  );
};
