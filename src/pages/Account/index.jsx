import classNames from 'classnames';
import { Text } from 'components/Text';
import { SEARCH_PARAMS } from 'constants/routes';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { capitalize } from 'utils/helpers';

import { Identification } from './components/Identification';
import { Settings } from './components/Settings';
import { Subscription } from './components/Subscription';
import styles from './styles.module.scss';

const tabs = ['settings', 'identification', 'subscription'];

export const Account = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get(SEARCH_PARAMS.TAB);
  const [activeTab, setActiveTab] = useState(tabParam);

  useEffect(() => {
    setSearchParams({ [SEARCH_PARAMS.TAB]: activeTab });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    if (tabParam !== tabs[0] && tabParam !== tabs[1] && tabParam !== tabs[2]) {
      setSearchParams({ [SEARCH_PARAMS.TAB]: tabs[0] });
      setActiveTab(tabs[0]);
    }
  }, [setSearchParams, tabParam]);

  const content = useMemo(() => {
    if (tabParam === tabs[0]) {
      return <Settings />;
    }

    if (tabParam === tabs[1]) {
      return <Identification />;
    }

    if (tabParam === tabs[2]) {
      return <Subscription />;
    }

    return null;
  }, [tabParam]);

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
                {capitalize(tab)}
              </Text>
            </button>
          ))}
        </div>
        <div className={styles['account__content-container']}>{content}</div>
      </div>
    </div>
  );
};
