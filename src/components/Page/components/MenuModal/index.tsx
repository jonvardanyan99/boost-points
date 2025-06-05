import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import logoutIcon from '~/assets/icons/logout.svg';
import avatar from '~/assets/images/avatar.svg';
import { Header } from '~/components/Header';
import { Modal } from '~/components/Modal';
import { PopupModal } from '~/components/PopupModal';
import { Text } from '~/components/Text';
import { ROUTES } from '~/constants/routes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { resetStore } from '~/store/slices/app/actions';
import { selectAccount } from '~/store/slices/user/selectors';

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
      <Modal className={styles['menu-modal']} visible={visible}>
        <div className={styles['menu-modal__container']}>
          <Header className={styles['menu-modal__header']} icon="close" onClick={onClose} />
          <div className={styles['menu-modal__navbar']}>
            {navLinks.map(navLink => (
              <button
                key={navLink.title}
                type="button"
                onClick={() => handleNavLinkClick(navLink.route)}
              >
                <Text
                  className={classNames(styles['menu-modal__text'], {
                    [styles['menu-modal__text--active']]: navLink.route === location.pathname,
                  })}
                  fontWeight={600}
                  type="p1"
                >
                  {navLink.title}
                </Text>
              </button>
            ))}
          </div>
          <div className={styles['menu-modal__footer']}>
            <div className={styles['menu-modal__footer-wrapper']}>
              <div className={styles['menu-modal__user-info']}>
                <img alt="avatar" src={avatar} />
                <div>
                  <Text className={styles['menu-modal__full-name']} type="p3">
                    {account?.data.fullName || ''}
                  </Text>
                  <Text className={styles['menu-modal__text']} type="p6">
                    {account?.data.email || ''}
                  </Text>
                </div>
              </div>
              <button
                className={styles['menu-modal__logout-wrapper']}
                type="button"
                onClick={handleLogoutClick}
              >
                <img alt="logout" src={logoutIcon} />
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <PopupModal
        heading="Log out"
        message="Are you sure to log out from your account?"
        primaryButtonClick={closePopupModal}
        primaryButtonTitle="Cancel"
        secondaryButtonClick={logout}
        secondaryButtonTitle="Log out"
        visible={popupModalVisible}
      />
    </>
  );
};
