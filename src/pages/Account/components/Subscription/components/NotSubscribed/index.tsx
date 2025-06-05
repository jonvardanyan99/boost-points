import React from 'react';
import { useNavigate } from 'react-router-dom';

import information from '~/assets/images/information.svg';
import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import { ROUTES } from '~/constants/routes';

import styles from './styles.module.scss';

export const NotSubscribed: React.FC = () => {
  const navigate = useNavigate();

  const navigateToPlans = () => {
    navigate(ROUTES.SUBSCRIPTION_PLANS);
  };

  return (
    <div className={styles['not-subscribed']}>
      <img alt="information" height="80px" src={information} width="80px" />
      <Text className={styles['not-subscribed__text']} fontWeight={600} type="p2">
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
