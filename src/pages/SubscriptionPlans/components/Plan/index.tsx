import React, { useMemo } from 'react';

import greenCheckMark from '~/assets/icons/green-check-mark.svg';
import { Button } from '~/components/Button';
import { Text } from '~/components/Text';
import { useErrorHandler } from '~/hooks/useErrorHandler';
import { useMutation } from '~/hooks/useMutation';
import { API } from '~/services/api';
import { SubscriptionPlan } from '~/types/models';
import { formatToCurrency } from '~/utils/formats';

import styles from './styles.module.scss';

interface Props {
  data: SubscriptionPlan;
  selectedPlan: SubscriptionPlan['name'] | undefined;
}

export const Plan: React.FC<Props> = ({ data, selectedPlan }) => {
  const { handleApiError, snackbar } = useErrorHandler();

  const activateSubscription = async () => {
    try {
      await API.activateSubscription({ subscriptionPlanUuid: data.uuid });

      window.location.reload();
    } catch (error) {
      handleApiError(error);
    }
  };

  const [activate, { loading }] = useMutation(activateSubscription);

  const durationText = useMemo(() => {
    return data.interval === 'Month' ? `${data.duration}-month plan` : 'Full year one payment';
  }, [data.interval, data.duration]);

  return (
    <div className={styles.plan}>
      <div className={styles.plan__header}>
        <div className={styles['plan__heading-wrapper']}>
          <Text className={styles.plan__text} type="h6">
            {data.name}
          </Text>
          <Text className={styles['plan__duration-text']} type="p5">
            {durationText}
          </Text>
        </div>
        {data.discount ? (
          <div>
            <div className={styles['plan__prices-wrapper']}>
              <Text className={styles.plan__price} fontWeight={600} type="p3">
                {formatToCurrency(data.price)}
              </Text>
              <Text className={styles.plan__text} fontWeight={600} type="p3">
                {data.interval === 'Month'
                  ? `${formatToCurrency(data.price, data.discount)}/month*`
                  : `${formatToCurrency(data.price, data.discount)}*`}
              </Text>
            </div>
            <Text className={styles.plan__discount} type="p5">{`${data.discount}% discount`}</Text>
          </div>
        ) : (
          <Text className={styles.plan__text} fontWeight={600} type="p3">
            {data.interval === 'Month'
              ? `${formatToCurrency(data.price)}/month*`
              : `${formatToCurrency(data.price)}*`}
          </Text>
        )}
      </div>
      <div className={styles['plan__features-container']}>
        <div className={styles['plan__feature-wrapper']}>
          <img alt="green-check-mark" height="20px" src={greenCheckMark} width="20px" />
          <Text
            className={styles['plan__feature-text']}
            type="p4"
          >{`${data.disputesQt} disputes per month`}</Text>
        </div>
        <div className={styles['plan__feature-wrapper']}>
          <img alt="green-check-mark" height="20px" src={greenCheckMark} width="20px" />
          <Text className={styles['plan__feature-text']} type="p4">
            Dedicated customer support
          </Text>
        </div>
        <div className={styles['plan__feature-wrapper']}>
          <img alt="green-check-mark" height="20px" src={greenCheckMark} width="20px" />
          <Text className={styles['plan__feature-text']} type="p4">
            Regular updates on your credit disputes
          </Text>
        </div>
      </div>
      <Button
        className={styles.plan__button}
        disabled={!data.isAvailable}
        loading={loading}
        title={data.name === selectedPlan ? 'Selected' : 'Select'}
        onClick={activate}
      />
      {snackbar}
    </div>
  );
};
