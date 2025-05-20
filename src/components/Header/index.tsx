import close from 'assets/icons/close-white.svg';
import menu from 'assets/icons/menu.svg';
import logo from 'assets/images/logo-white.svg';
import classNames from 'classnames';
import { ROUTES } from 'constants/routes';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

interface Props {
  icon: 'menu' | 'close';
  onClick: () => void;
  className?: string;
}

export const Header: React.FC<Props> = ({ icon, onClick, className }) => {
  return (
    <header className={classNames(styles.header, className)}>
      <Link to={ROUTES.HOME} className={styles['header__logo-wrapper']}>
        <img src={logo} alt="logo" />
      </Link>
      <button type="button" className={styles['header__icon-wrapper']} onClick={onClick}>
        <img src={icon === 'menu' ? menu : close} alt="menu-icon" />
      </button>
    </header>
  );
};
