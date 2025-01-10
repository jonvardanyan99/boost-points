import information from 'assets/images/information.svg';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export const NotSubscribed = () => {
  const navigate = useNavigate();

  const navigateToPlans = () => {
    navigate(ROUTES.SUBSCRIPTION_PLANS);
  };

  return (
    <div className={styles['not-subscribed']}>
      <img src={information} width="80px" height="80px" alt="information" />
      <Text type="p2" fontWeight={600} className={styles['not-subscribed__text']}>
        Your subscription is not active
      </Text>
      <Button
        className={styles['not-subscribed__button']}
        title="View plans"
        onClick={navigateToPlans}
      />
    </div>
  );
};
