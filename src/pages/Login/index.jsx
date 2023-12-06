import { React, useState } from 'react';

import logo from '../../assets/images/svgviewer-output.png';
import { Input } from '../../components/Input';
import { Text } from '../../components/Text';
import styles from './styles.module.scss';

export const Login = () => {
  const [inputValue, setInputValue] = useState();

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
          placeholder="0432 892 002"
          value={inputValue}
          onChange={handleInputChange}
          error="this is an error"
        />
      </div>
    </div>
  );
};