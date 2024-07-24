import classNames from 'classnames';
import { Text } from 'components/Text';
import React, { useState } from 'react';

import { Identification } from './components/Identification';
import { Settings } from './components/Settings';
import styles from './styles.module.scss';

const tabs = ['Settings', 'Identification', 'Subscription'];

export const Account = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  let content;

  if (activeTab === tabs[0]) {
    content = <Settings />;
  } else if (activeTab === tabs[1]) {
    content = <Identification />;
  }

  return (
    <div className={styles.account}>
      <div className={styles.account__container}>
        <Text type="h6" className={styles.account__heading}>
          Account
        </Text>
        <div className={styles['account__tabs-wrapper']}>
          {tabs.map(tab => (
            <button
              type="button"
              key={tab}
              className={classNames(styles.account__tab, {
                [styles['account__tab--active']]: activeTab === tab,
              })}
              onClick={() => setActiveTab(tab)}
            >
              <Text
                type="p5"
                className={classNames(styles['account__tab-text'], {
                  [styles['account__tab-text--active']]: activeTab === tab,
                })}
              >
                {tab}
              </Text>
            </button>
          ))}
        </div>
        {content}
      </div>
    </div>
  );
};
