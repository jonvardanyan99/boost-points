import close from 'assets/icons/close-white.svg';
import { Loader } from 'components/Loader';
import { Text } from 'components/Text';
import { ROUTES, SEARCH_PARAMS } from 'constants/routes';
import { useQuery } from 'hooks/useQuery';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API } from 'services/api';
import { selectAccount } from 'store/slices/user/selectors';

import { Plan } from './components/Plan';
import styles from './styles.module.scss';

export const SubscriptionPlans = () => {
  const account = useSelector(selectAccount);
  const { subscription } = account;
  const navigate = useNavigate();

  const { data, loading } = useQuery({ requestFn: API.getSubscriptionPlans });

  const navigateToSubscription = useCallback(() => {
    navigate({
      pathname: ROUTES.ACCOUNT,
      search: `?${SEARCH_PARAMS.TAB}=subscription`,
    });
  }, [navigate]);

  return (
    <div className={styles.page}>
      <div className={styles['page__close-wrapper']}>
        <button
          type="button"
          className={styles['page__close-button']}
          onClick={navigateToSubscription}
        >
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
        <Loader forPage />
      ) : (
        <>
          <div className={styles['page__plans-container']}>
            {data?.map(plan => (
              <Plan
                key={plan.uuid}
                data={plan}
                selectedPlan={subscription.subscriptionPlan?.name}
              />
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
