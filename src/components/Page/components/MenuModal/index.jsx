import logout from 'assets/icons/logout.svg';
import avatar from 'assets/images/avatar.svg';
import classNames from 'classnames';
import { Header } from 'components/Header';
import { Modal } from 'components/Modal';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LogoutModal } from './components/LogoutModal';
import styles from './styles.module.scss';

const navLinks = [
  { route: ROUTES.DASHBOARD, text: 'Dashboard' },
  { route: ROUTES.HOME, text: 'Disputes' },
  { route: ROUTES.HOME, text: 'FAQ' },
  { route: ROUTES.HOME, text: 'Support' },
  { route: ROUTES.HOME, text: 'Account' },
];

export const MenuModal = ({ visible, onClose, account }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  useUpdateEffect(() => {
    if (!Object.keys(account).length && visible) {
      onClose();
    }
  }, [account]);

  const handleNavLinkClick = route => {
    navigate(route);
    onClose();
  };

  const openLogoutModal = () => {
    setLogoutModalVisible(true);
    onClose();
  };

  const closeLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  return (
    <>
      <Modal visible={visible} className={styles['menu-modal']}>
        <div className={styles['menu-modal__container']}>
          <Header icon="close" onClick={onClose} className={styles['menu-modal__header']} />
          <div className={styles['menu-modal__navbar']}>
            {navLinks.map(navLink => (
              <button
                type="button"
                key={navLink.text}
                onClick={() => handleNavLinkClick(navLink.route)}
              >
                <Text
                  type="p1"
                  fontWeight={600}
                  className={classNames(styles['menu-modal__text'], {
                    [styles['menu-modal__text--active']]: navLink.route === location.pathname,
                  })}
                >
                  {navLink.text}
                </Text>
              </button>
            ))}
          </div>
          <div className={styles['menu-modal__footer']}>
            <div className={styles['menu-modal__footer-wrapper']}>
              <div className={styles['menu-modal__user-info']}>
                <img src={avatar} alt="avatar" />
                <div>
                  <Text type="p3" className={styles['menu-modal__full-name']}>
                    {account.data?.fullName || ''}
                  </Text>
                  <Text type="p6" className={styles['menu-modal__text']}>
                    {account.data?.email || ''}
                  </Text>
                </div>
              </div>
              <button
                type="button"
                className={styles['menu-modal__logout-wrapper']}
                onClick={openLogoutModal}
              >
                <img src={logout} alt="logout" />
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <LogoutModal visible={logoutModalVisible} onClose={closeLogoutModal} />
    </>
  );
};

MenuModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  account: PropTypes.shape({}).isRequired,
};
