import React from 'react';
import { useAppSelector } from 'store/hooks';
import { selectAccount } from 'store/slices/user/selectors';
import { UserState } from 'store/slices/user/types';

import { NotSubscribed } from './components/NotSubscribed';
import { Subscribed } from './components/Subscribed';
import styles from './styles.module.scss';

export const Subscription: React.FC = () => {
  const account = useAppSelector(selectAccount) as NonNullable<UserState['account']>;
  const { subscription } = account;

  return (
    <div className={styles.subscription}>
      {subscription?.status === 'Active' ? (
        <Subscribed subscription={subscription} />
      ) : (
        <NotSubscribed />
      )}
    </div>
  );
};
