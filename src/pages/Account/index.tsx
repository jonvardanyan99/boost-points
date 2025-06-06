import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Text } from '~/components/Text';
import { SEARCH_PARAMS } from '~/constants/routes';
import { capitalize } from '~/utils/helpers';

import { Identification } from './components/Identification';
import { Settings } from './components/Settings';
import { Subscription } from './components/Subscription';
import styles from './styles.module.scss';

type Tab = 'settings' | 'identification' | 'subscription';
const TABS: Tab[] = ['settings', 'identification', 'subscription'];

export const Account: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = (searchParams.get(SEARCH_PARAMS.TAB) || '') as Tab;

  useEffect(() => {
    if (!TABS.includes(tabParam)) {
      setSearchParams(prevValue => {
        prevValue.set(SEARCH_PARAMS.TAB, TABS[0]);

        return prevValue;
      });
    }
  }, [setSearchParams, tabParam]);

  const handleActiveTabChange = useCallback(
    (newValue: Tab) => {
      setSearchParams(prevValue => {
        prevValue.set(SEARCH_PARAMS.TAB, newValue);

        return prevValue;
      });
    },
    [setSearchParams],
  );

  const content = useMemo(() => {
    if (tabParam === TABS[0]) {
      return <Settings />;
    }

    if (tabParam === TABS[1]) {
      return <Identification />;
    }

    if (tabParam === TABS[2]) {
      return <Subscription />;
    }

    return null;
  }, [tabParam]);

  return (
    <div className={styles.account}>
      <div className={styles.account__container}>
        <Text className={styles.account__heading} type="h6">
          Account
        </Text>
        <div className={styles['account__tabs-wrapper']}>
          {TABS.map(tab => (
            <button
              className={classNames(styles.account__tab, {
                [styles['account__tab--active']]: tabParam === tab,
              })}
              key={tab}
              type="button"
              onClick={() => handleActiveTabChange(tab)}
            >
              <Text
                className={classNames(styles['account__tab-text'], {
                  [styles['account__tab-text--active']]: tabParam === tab,
                })}
                type="p5"
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
