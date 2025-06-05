import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';

import downArrow from '~/assets/icons/down-arrow.svg';
import exclamationMark from '~/assets/icons/exclamation-mark.svg';
import upArrow from '~/assets/icons/up-arrow.svg';
import { Text } from '~/components/Text';
import { GetIssuesResponse } from '~/services/api/types/queries';
import { Agency, AgencyIssueCategory } from '~/types/models';

import { Issue } from './components/Issue';
import styles from './styles.module.scss';

interface Props {
  name: AgencyIssueCategory;
  issues: NonNullable<GetIssuesResponse['data']>;
  agency: Agency;
}

export const IssueCategory: React.FC<Props> = ({ name, issues, agency }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const data = useMemo(() => {
    return issues.find(issue => issue.name === name) || null;
  }, [name, issues]);

  const toggleCategoryOpen = useCallback(() => {
    setIsCategoryOpen(prevValue => !prevValue);
  }, []);

  return (
    <div className={classNames(styles.category, { [styles['category--open']]: isCategoryOpen })}>
      <button
        className={classNames(styles.category__button, {
          [styles['category__button--active']]: data,
        })}
        type="button"
        onClick={data ? toggleCategoryOpen : undefined}
      >
        <div
          className={classNames(styles.category__header, {
            [styles['category__header--open']]: isCategoryOpen,
          })}
        >
          <Text fontWeight={600} type="p3">
            {name}
          </Text>
          {data ? (
            <div className={styles['category__quantity-container']}>
              <div className={styles['category__quantity-wrapper']}>
                <img alt="exclamation-mark" height="13px" src={exclamationMark} width="13px" />
                <Text className={styles.category__quantity} fontWeight={600} type="p4">
                  {data.qt}
                </Text>
              </div>
              {isCategoryOpen ? (
                <img alt="up-arrow" src={upArrow} />
              ) : (
                <img alt="down-arrow" src={downArrow} />
              )}
            </div>
          ) : (
            <Text className={styles['category__no-quantity']} fontWeight={600} type="p4">
              0
            </Text>
          )}
        </div>
      </button>
      {isCategoryOpen && (
        <div className={styles['category__issues-container']}>
          {data?.issues.map(issue => <Issue agency={agency} data={issue} key={issue.uuid} />)}
        </div>
      )}
    </div>
  );
};
