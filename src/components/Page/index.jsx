import menu from 'assets/icons/menu.svg';
import logo from 'assets/images/logo-white.svg';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAccount } from 'store/reducers/user/selectors';

import styles from './styles.module.scss';

export const Page = ({ children }) => {
  const account = useSelector(selectAccount);

  const isConsentFormSigned = !!account?.isConsentFormSigned;

  return (
    <div className={classNames(styles.page, { [styles['page--signed']]: isConsentFormSigned })}>
      {isConsentFormSigned && (
        <header className={styles.page__header}>
          <img src={logo} alt="logo" />
          <button type="button" className={styles['page__menu-wrapper']}>
            <img src={menu} alt="menu-icon" />
          </button>
        </header>
      )}
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
