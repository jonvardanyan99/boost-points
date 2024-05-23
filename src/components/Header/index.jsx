import menu from 'assets/icons/menu.svg';
import logo from 'assets/images/logo-white.svg';
import React from 'react';

import styles from './styles.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" />
      <div className={styles['header__menu-wrapper']}>
        <img src={menu} alt="menu-icon" />
      </div>
    </header>
  );
};
