import greenCheckMark from 'assets/icons/green-check-mark.svg';
import { Button } from 'components/Button';
import { Text } from 'components/Text';
import { useErrorHandler } from 'hooks/useErrorHandler';
import { useMutation } from 'hooks/useMutation';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { API } from 'services/api';
import { formatToCurrency } from 'utils/formats';

import styles from './styles.module.scss';

export const Plan = ({ data, selectedPlan }) => {
  const { handleApiError, snackbar } = useErrorHandler();

  const activateSubscription = async () => {
    try {
      await API.activateSubscription({ subscriptionPlanUuid: data.uuid });
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
          <Text type="h6" className={styles.plan__text}>
            {data.name}
          </Text>
          <Text type="p5" className={styles['plan__duration-text']}>
            {durationText}
          </Text>
        </div>
        {data.discount ? (
          <div>
            <div className={styles['plan__prices-wrapper']}>
              <Text type="p3" fontWeight={600} className={styles.plan__price}>
                {formatToCurrency(data.price)}
              </Text>
              <Text type="p3" fontWeight={600} className={styles.plan__text}>
                {data.interval === 'Month'
                  ? `${formatToCurrency(data.price, data.discount)}/month*`
                  : `${formatToCurrency(data.price, data.discount)}*`}
              </Text>
            </div>
            <Text type="p5" className={styles.plan__discount}>{`${data.discount}% discount`}</Text>
          </div>
        ) : (
          <Text type="p3" fontWeight={600} className={styles.plan__text}>
            {data.interval === 'Month'
              ? `${formatToCurrency(data.price)}/month*`
              : `${formatToCurrency(data.price)}*`}
          </Text>
        )}
      </div>
      <div className={styles['plan__features-container']}>
        <div className={styles['plan__feature-wrapper']}>
          <img src={greenCheckMark} width="20px" height="20px" alt="green-check-mark" />
          <Text
            type="p4"
            className={styles['plan__feature-text']}
          >{`${data.disputesQt} disputes per month`}</Text>
        </div>
        <div className={styles['plan__feature-wrapper']}>
          <img src={greenCheckMark} width="20px" height="20px" alt="green-check-mark" />
          <Text type="p4" className={styles['plan__feature-text']}>
            Dedicated customer support
          </Text>
        </div>
        <div className={styles['plan__feature-wrapper']}>
          <img src={greenCheckMark} width="20px" height="20px" alt="green-check-mark" />
          <Text type="p4" className={styles['plan__feature-text']}>
            Regular updates on your credit disputes
          </Text>
        </div>
      </div>
      <Button
        className={styles.plan__button}
        title={data.name === selectedPlan ? 'Selected' : 'Select'}
        onClick={activate}
        loading={loading}
        disabled={!data.isAvailable}
      />
      {snackbar}
    </div>
  );
};

Plan.propTypes = {
  data: PropTypes.shape({}).isRequired,
  selectedPlan: PropTypes.oneOf([
    'Basic Resolve',
    'Advanced Resolve',
    'Premium Resolve',
    'test name',
  ]),
};
