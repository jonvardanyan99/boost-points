import close from 'assets/icons/close.svg';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { useQuery } from 'hooks/useQuery';
import React from 'react';
import { API } from 'services/api';

import { Plan } from './components/Plan';
import styles from './styles.module.scss';

export const SubscriptionPlans = () => {
  const { data, loading } = useQuery({ requestFn: API.getSubscriptionPlans });

  return (
    <div className={styles.page}>
      <div className={styles['page__close-wrapper']}>
        <button className={styles['page__close-button']} type="button">
          <img src={close} alt="close" />
        </button>
      </div>
      <Text type="h4" className={styles.page__heading}>
        Subscribe and take control of your financial future!
      </Text>
      <Text type="p4" className={styles.page__text}>
        Choose the plan that suits you
      </Text>
      {loading ? (
        <Loader secondary size={25} />
      ) : (
        <>
          <div className={styles['page__plans-container']}>
            {data?.map(plan => (
              <Plan key={plan.name} data={plan} />
            ))}
          </div>
          <Text type="p6" className={styles['page__disclaimer-text']}>
            *Does not include GST, which will be added further on the payment page
          </Text>
        </>
      )}
    </div>
  );
};
