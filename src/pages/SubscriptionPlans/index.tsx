import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import close from '~/assets/icons/close-white.svg';
import { Loader } from '~/components/Loader';
import { Text } from '~/components/Text';
import { ROUTES, SEARCH_PARAMS } from '~/constants/routes';
import { useQuery } from '~/hooks/useQuery';
import { API } from '~/services/api';
import { useAppSelector } from '~/store/hooks';
import { selectAccount } from '~/store/slices/user/selectors';

import { Plan } from './components/Plan';
import styles from './styles.module.scss';

export const SubscriptionPlans: React.FC = () => {
  const account = useAppSelector(selectAccount);
  const subscription = useMemo(() => {
    const typedAccount = account as NonNullable<typeof account>;

    return typedAccount.subscription;
  }, [account]);
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
          className={styles['page__close-button']}
          type="button"
          onClick={navigateToSubscription}
        >
          <img alt="close" src={close} />
        </button>
      </div>
      <Text className={styles.page__heading} type="h4">
        Subscribe and take control of your financial future!
      </Text>
      <Text className={styles.page__text} type="p4">
        Choose the plan that suits you
      </Text>
      {loading ? (
        <Loader forPage />
      ) : (
        <>
          <div className={styles['page__plans-container']}>
            {data?.map(plan => (
              <Plan
                data={plan}
                key={plan.uuid}
                selectedPlan={subscription?.subscriptionPlan?.name}
              />
            ))}
          </div>
          <Text className={styles['page__disclaimer-text']} type="p6">
            *Does not include GST, which will be added further on the payment page
          </Text>
        </>
      )}
    </div>
  );
};
