import classNames from 'classnames';
import { Header } from 'components/Header';
import { ROUTES } from 'constants/routes';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { MenuModal } from './components/MenuModal';
import styles from './styles.module.scss';

const noHeaderList = [
  ROUTES.LOGIN,
  ROUTES.VERIFICATION,
  ROUTES.CREATE_ACCOUNT,
  ROUTES.IDENTIFICATION,
  ROUTES.CONSENT_FORM,
  ROUTES.SUBSCRIPTION_PLANS,
];

export const Page = ({ children }) => {
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const location = useLocation();

  const openMenuModal = () => {
    setMenuModalVisible(true);
  };

  const closeMenuModal = () => {
    setMenuModalVisible(false);
  };

  const shouldBeHeader = !noHeaderList.includes(location.pathname);

  return (
    <div className={classNames(styles.page, { [styles['page--with-header']]: shouldBeHeader })}>
      {shouldBeHeader && <Header icon="menu" onClick={openMenuModal} />}
      {children}
      {shouldBeHeader && <MenuModal visible={menuModalVisible} onClose={closeMenuModal} />}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
