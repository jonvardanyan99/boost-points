import React from 'react';

import logo from '../../assets/images/svgviewer-output.png';
import { Text } from '../../components/Text';
import styles from './styles.module.scss';

export const Login = () => {
  return (
    <div className={styles.login}>
      <div>
        <img src={logo} alt="logo" />
        <Text type="h4" className={styles.heading}>
          Log in
        </Text>
      </div>
    </div>
  );
};
