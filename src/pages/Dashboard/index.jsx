import equifax from 'assets/images/equifax.svg';
import experian from 'assets/images/experian.svg';
import illion from 'assets/images/illion.svg';
import { Text } from 'components/Text';
import React from 'react';

import { CreditScore } from './components/CreditScore';
import styles from './styles.module.scss';

export const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__container}>
        <Text type="h6">Credit Scores</Text>
        <CreditScore
          className={styles['dashboard__credit-score']}
          agency="experian"
          logo={experian}
          maxScore={1200}
          disabled
        />
        <CreditScore
          className={styles['dashboard__credit-score']}
          agency="equifax"
          logo={equifax}
          maxScore={1200}
        />
        <CreditScore
          className={styles['dashboard__credit-score']}
          agency="illion"
          logo={illion}
          maxScore={1200}
          disabled
        />
      </div>
    </div>
  );
};
