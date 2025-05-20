import information from 'assets/images/information.svg';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import { ROUTES } from 'constants/routes';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Subscription } from 'types/models';
import { formatToCurrency } from 'utils/formats';

import styles from './styles.module.scss';

interface Props {
  subscription: Subscription;
}

export const Subscribed: React.FC<Props> = ({ subscription }) => {
  const navigate = useNavigate();

  const subscriptionPlanText = useMemo(() => {
    if (subscription.subscriptionPlan) {
      const firstWord = subscription.subscriptionPlan.name.split(' ')[0];
      const formattedPrice = formatToCurrency(
        subscription.subscriptionPlan.price,
        subscription.subscriptionPlan.discount,
      );
      const intervalText = subscription.subscriptionPlan.interval.toLowerCase();

      return `${firstWord} - ${formattedPrice}/${intervalText}`;
    }

    return '';
  }, [subscription.subscriptionPlan]);

  const navigateToPaymentMethod = useCallback(() => {
    navigate(ROUTES.PAYMENT_METHOD);
  }, [navigate]);

  const navigateToPlans = useCallback(() => {
    navigate(ROUTES.SUBSCRIPTION_PLANS);
  }, [navigate]);

  return (
    <div className={styles.subscribed}>
      <div className={styles.subscribed__header}>
        <img src={information} alt="information" />
        <Text type="p2" fontWeight={600}>
          Your subscription is active
        </Text>
      </div>
      <Text type="p4" className={styles.subscribed__title}>
        Plan
      </Text>
      <Text type="p3">{subscriptionPlanText}</Text>
      <Text type="p4" className={styles.subscribed__title}>
        Charging from
      </Text>
      <div className={styles['subscribed__payment-wrapper']}>
        <Text type="p3">{subscription.cardInfo || ''}</Text>
        <Text type="p3" className={styles.subscribed__divider}>
          |
        </Text>
        <button type="button" onClick={navigateToPaymentMethod}>
          <Text type="p3" className={styles['subscribed__button-text']}>
            Change
          </Text>
        </button>
      </div>
      <Button
        className={styles['subscribed__main-button']}
        title="Upgrade"
        onClick={navigateToPlans}
      />
    </div>
  );
};
