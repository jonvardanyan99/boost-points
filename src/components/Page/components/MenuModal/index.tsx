import logoutIcon from 'assets/icons/logout.svg';
import avatar from 'assets/images/avatar.svg';
import classNames from 'classnames';
import { Header } from 'components/Header';
import { Modal } from 'components/Modal';
import { PopupModal } from 'components/PopupModal';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { resetStore } from 'store/slices/app/actions';
import { selectAccount } from 'store/slices/user/selectors';

import styles from './styles.module.scss';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const navLinks = [
  { route: ROUTES.DASHBOARD, title: 'Dashboard' },
  { route: ROUTES.DISPUTES, title: 'Disputes' },
  { route: ROUTES.FAQ, title: 'FAQ' },
  { route: ROUTES.ACCOUNT, title: 'Account' },
];

export const MenuModal: React.FC<Props> = ({ visible, onClose }) => {
  const account = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [popupModalVisible, setPopupModalVisible] = useState(false);

  useEffect(() => {
    if (!account && visible) {
      onClose();
    }
  }, [account, visible, onClose]);

  const handleNavLinkClick = (route: (typeof navLinks)[number]['route']) => {
    onClose();
    navigate(route);
  };

  const handleLogoutClick = () => {
    onClose();
    setPopupModalVisible(true);
  };

  const closePopupModal = () => {
    setPopupModalVisible(false);
  };

  const logout = () => {
    onClose();
    dispatch(resetStore());
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
                key={navLink.title}
                onClick={() => handleNavLinkClick(navLink.route)}
              >
                <Text
                  type="p1"
                  fontWeight={600}
                  className={classNames(styles['menu-modal__text'], {
                    [styles['menu-modal__text--active']]: navLink.route === location.pathname,
                  })}
                >
                  {navLink.title}
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
                    {account?.data.fullName || ''}
                  </Text>
                  <Text type="p6" className={styles['menu-modal__text']}>
                    {account?.data.email || ''}
                  </Text>
                </div>
              </div>
              <button
                type="button"
                className={styles['menu-modal__logout-wrapper']}
                onClick={handleLogoutClick}
              >
                <img src={logoutIcon} alt="logout" />
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <PopupModal
        visible={popupModalVisible}
        heading="Log out"
        message="Are you sure to log out from your account?"
        secondaryButtonTitle="Log out"
        secondaryButtonClick={logout}
        primaryButtonTitle="Cancel"
        primaryButtonClick={closePopupModal}
      />
    </>
  );
};
