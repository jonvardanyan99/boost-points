import close from 'assets/icons/close-white.svg';
import menu from 'assets/icons/menu.svg';
import logo from 'assets/images/logo-white.svg';
import classNames from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

interface Props {
  icon: 'menu' | 'close';
  onClick: () => void;
  className?: string;
}

export const Header: React.FC<Props> = ({ icon, onClick, className }) => {
  return (
    <header className={classNames(styles.header, className)}>
      <img src={logo} alt="logo" />
      <button type="button" className={styles['header__icon-wrapper']} onClick={onClick}>
        <img src={icon === 'menu' ? menu : close} alt="menu-icon" />
      </button>
    </header>
  );
};
