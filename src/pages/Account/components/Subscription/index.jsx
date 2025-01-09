import React from 'react';
import { useSelector } from 'react-redux';
import { selectAccount } from 'store/slices/user/selectors';

import { NotSubscribed } from './components/NotSubscribed';
import { Subscribed } from './components/Subscribed';
import styles from './styles.module.scss';

export const Subscription = () => {
  const account = useSelector(selectAccount);
  const { subscription } = account;

  return (
    <div className={styles.subscription}>
      {subscription.status === 'Active' ? (
        <Subscribed subscription={subscription} />
      ) : (
        <NotSubscribed />
      )}
    </div>
  );
};
