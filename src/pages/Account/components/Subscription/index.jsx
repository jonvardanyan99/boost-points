import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAccount } from 'store/reducers/user/selectors';

import { NotSubscribed } from './components/NotSubscribed';
import { Subscribed } from './components/Subscribed';
import styles from './styles.module.scss';

export const Subscription = () => {
  const account = useSelector(selectAccount);

  const content = useMemo(() => {
    return account.isSubscriptionActivated ? <Subscribed /> : <NotSubscribed />;
  }, [account.isSubscriptionActivated]);

  return <div className={styles.subscription}>{content}</div>;
};
