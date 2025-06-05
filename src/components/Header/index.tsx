import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import close from '~/assets/icons/close-white.svg';
import menu from '~/assets/icons/menu.svg';
import logo from '~/assets/images/logo-white.svg';
import { ROUTES } from '~/constants/routes';

import styles from './styles.module.scss';

interface Props {
  icon: 'menu' | 'close';
  onClick: () => void;
  className?: string;
}

export const Header: React.FC<Props> = ({ icon, onClick, className }) => {
  return (
    <header className={classNames(styles.header, className)}>
      <Link className={styles['header__logo-wrapper']} to={ROUTES.HOME}>
        <img alt="logo" src={logo} />
      </Link>
      <button className={styles['header__icon-wrapper']} type="button" onClick={onClick}>
        <img alt="menu-icon" src={icon === 'menu' ? menu : close} />
      </button>
    </header>
  );
};
