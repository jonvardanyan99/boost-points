import close from 'assets/icons/close-white.svg';
import menu from 'assets/icons/menu.svg';
import logo from 'assets/images/logo-white.svg';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles.module.scss';

export const Header = ({ icon, onClick, className }) => {
  return (
    <header className={classNames(styles.header, className)}>
      <img src={logo} alt="logo" />
      <button type="button" className={styles['header__icon-wrapper']} onClick={onClick}>
        <img src={icon === 'menu' ? menu : close} alt="menu-icon" />
      </button>
    </header>
  );
};

Header.propTypes = {
  icon: PropTypes.oneOf(['menu', 'close']).isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};
