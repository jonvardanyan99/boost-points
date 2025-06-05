import React from 'react';

import equifax from '~/assets/images/equifax.svg';
import experian from '~/assets/images/experian.svg';
import illion from '~/assets/images/illion.svg';
import { Text } from '~/components/Text';

import { CreditScore } from './components/CreditScore';
import styles from './styles.module.scss';

export const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__container}>
        <Text type="h6">Credit Scores</Text>
        <CreditScore
          disabled
          agency="experian"
          className={styles['dashboard__credit-score']}
          logo={experian}
          maxScore={1200}
        />
        <CreditScore
          agency="equifax"
          className={styles['dashboard__credit-score']}
          logo={equifax}
          maxScore={1200}
        />
        <CreditScore
          disabled
          agency="illion"
          className={styles['dashboard__credit-score']}
          logo={illion}
          maxScore={1200}
        />
      </div>
    </div>
  );
};
