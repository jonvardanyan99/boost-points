import classNames from 'classnames';
import { Header } from 'components/Header';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAccount } from 'store/reducers/user/selectors';

import { MenuModal } from './components/MenuModal';
import styles from './styles.module.scss';

export const Page = ({ children }) => {
  const account = useSelector(selectAccount);
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const isConsentFormSigned = !!account?.isConsentFormSigned;

  const openMenuModal = () => {
    setMenuModalVisible(true);
  };

  const closeMenuModal = () => {
    setMenuModalVisible(false);
  };

  return (
    <div className={classNames(styles.page, { [styles['page--signed']]: isConsentFormSigned })}>
      {isConsentFormSigned && <Header icon="menu" onClick={openMenuModal} />}
      {children}
      <MenuModal visible={menuModalVisible} onClose={closeMenuModal} account={account || {}} />
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
